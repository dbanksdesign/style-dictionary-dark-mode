const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const iosPath = `ios/dist/`;
const androidPath = `android/styledictionary/src/main/res/`;
const webPath = `web/dist/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${iosPath}...`);
fs.removeSync(iosPath);
console.log(`cleaning ${androidPath}...`);
fs.removeSync(androidPath);
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);

const modes = [`light`,`dark`];

modes.forEach(mode => {
  console.log(`Building ${mode} mode...`);
  
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
  
  if (mode === `dark`) {
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
      `tokens/**/*!(.${modes.join(`|`)}).+(js|json5)`
    ],
    source: [
      // I know there are no "light" tokens, because default is light mode
      `tokens/**/*.${mode}.+(js|json5)`
    ],
    // custom actions
    action: {
      generateColorsets: require('./actions/ios/colorsets'),
      generateGraphics: require('./actions/generateGraphics'),
    },
    // custom transforms
    transform: {
      'attribute/cti': require('./transforms/attributeCTI'),
      'colorRGB': require('./transforms/colorRGB')
    },
    // custom formats
    format: {
      swiftColor: require('./formats/swiftColor'),
      swiftImage: require('./formats/swiftImage'),
    },
    
    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [{
          destination: `variables-${mode}.css`,
          format: `css/variables`,
          filter: (token) => token.attributes.category !== 'image',
          options: {
            outputReferences: true
          }
        }]
      },
      // TODO: we don't need to generate these multiple times
      iOS: {
        buildPath: iosPath,
        transforms: [`attribute/cti`,`name/ti/camel`,`size/swift/remToCGFloat`],
        files: [{
          destination: `Color.swift`,
          format: `swiftColor`,
          filter: (token) => token.attributes.category === `color`,
          options: {
            outputReferences: true
          }
        },{
          destination: `Size.swift`,
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
        buildPath: iosPath,
        mode,
        transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
        actions: [`generateColorsets`]
      },
      
      asset: {
        mode,
        transforms: [`attribute/cti`,`color/hex`,`name/ti/camel`],
        buildPath: webPath,
        iosPath,
        androidPath,
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