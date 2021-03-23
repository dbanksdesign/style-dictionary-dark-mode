const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const androidPath = `android/designtokens/src/main/res/`;

// before this runs we need to clean the iOS directory or else the
// colorset generation won't work as intended.
fs.removeSync(`ios/dist`);
fs.removeSync(androidPath);

[`light`,`dark`].forEach(theme => {
  console.log(`Building ${theme} theme...`);
  
  let androidColor = {
    destination: `values/colors.xml`,
    format: `android/resources`,
    filter: (token) => token.attributes.category === `color`,
    options: {
      // this is important!
      // this will keep token references intact so that we don't need
      // to generate *all* color resources for dark mode, only
      // the specific ones that change
      outputReferences: true
    },
  };
  
  if (theme === `dark`) {
    androidColor = {
      destination: `values-night/colors.xml`,
      format: `android/resources`,
      filter: (token) => token.filePath.indexOf('dark') > -1
    }
  }
  
  StyleDictionary.extend({
    // Using the include array so that theme token overrides don't show
    // warnings in the console. 
    include: [
      `tokens/**/*.+(js|json5)`
    ],
    source: [
      // I know there are no "light" tokens, because default is light mode
      `${theme}-tokens/**/*.+(js|json5)`
    ],
    action: {
      generateColorsets: require('./actions/ios/colorsets'),
      generateGraphics: require('./actions/generateGraphics'),
    },
    transform: {
      'attribute/cti': require('./transforms/attributeCTI'),
      'colorRGB': require('./transforms/colorRGB')
    },
    format: {
      swiftColor: require('./formats/swiftColor'),
      swiftImage: require('./formats/swiftImage'),
    },
    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: `web/dist/`,
        files: [{
          destination: `variables-${theme}.css`,
          format: `css/variables`,
          filter: (token) => token.attributes.category !== 'image',
          options: {
            outputReferences: true
          }
        }]
      },
      // TODO: we don't need to generate these multiple times
      iOS: {
        buildPath: `ios/dist/`,
        transforms: [`attribute/cti`,`name/ti/camel`,`size/swift/remToCGFloat`],
        files: [{
          destination: `Color.swift`,
          format: `swiftColor`,
          filter: (token) => token.attributes.category === `color`,
          options: {
            outputReferences: true
          }
        },{
          destination: `StyleDictionary.swift`,
          filter: (token) => token.attributes.category === `size`,
          className: `Size`,
          format: `ios-swift/class.swift`
        },{
          destination: `Image.swift`,
          filter: (token) => token.attributes.category === `image`,
          format: `swiftImage`
        }]
      },
      
      iOSColors: {
        buildPath: `ios/dist/`,
        theme,
        transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
        actions: [`generateColorsets`]
      },
      
      asset: {
        theme,
        transforms: [`attribute/cti`,`color/hex`,`name/ti/camel`],
        buildPath: `web/dist/`,
        iosPath: `ios/dist/`,
        androidPath: `android/designtokens/src/main/res/`,
        actions: [`generateGraphics`]
      },
      
      android: {
        transformGroup: `android`,
        buildPath: androidPath,
        files: [
          androidColor,
          {
            destination: `values/font_dimens.xml`,
            filter: (token) => token.attributes.category === `size` &&
              token.attributes.type === `font`,
            format: `android/resources`
          },{
            destination: `values/dimens.xml`,
            filter: (token) => token.attributes.size === `size` &&
              token.attributes.type !== `font`,
            format: `android/resources`
          }
        ]
      },
    }
  }).buildAllPlatforms();
});