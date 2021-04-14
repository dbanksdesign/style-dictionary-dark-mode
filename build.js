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

StyleDictionary.extend({
  source: [
    `tokens/**/*.+(js|json5)`
  ],
  // custom transforms
  transform: {
    'attribute/cti': require('./transforms/attributeCTI'),
    'colorRGB': require('./transforms/colorRGB'),
    'size/remToFloat': {
      type: 'value',
      matcher: (token) => token.attributes.category === 'size',
      transformer: (token) => {
        return token.value * 16
      }
    }
  },
  // custom actions
  action: {
    generateColorsets: require('./actions/ios/colorsets'),
    generateGraphics: require('./actions/generateGraphics'),
  },
  // custom formats
  format: {
    androidDarkResources: require('./formats/androidDarkResources'),
    swiftImage: require('./formats/swiftImage'),
    swiftColor: require('./formats/swiftColor'),
    cssDark: require('./formats/cssDark'),
  },
  
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables.css`,
        format: `cssDark`,
        options: {
          outputReferences: true
        }
      }]
    },
    
    js: {
      transformGroup: `web`,
      buildPath: webPath,
      files: [{
        destination: `tokens.json`,
        format: `json/flat`
      }]
    },
    
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
      transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
      actions: [`generateColorsets`]
    },
    
    asset: {
      transforms: [`attribute/cti`,`color/hex`,`size/remToFloat`,`name/ti/camel`],
      buildPath: `${webPath}/images/`,
      iosPath,
      androidPath,
      actions: [`generateGraphics`]
    },
    
    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
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
      },{
        // Here we are outputting a 'night' resource file that only has
        // the colors that have dark values. All the references
        // from the above file will properly reference
        // these colors if the OS is set to night mode.
        destination: `values-night/colors.xml`,
        format: `androidDarkResources`,
        filter: (token) => token.darkValue
      },{
        destination: `values/font_dimens.xml`,
        format: `android/fontDimens`
      },{
        destination: `values/dimens.xml`,
        format: `android/dimens`
      },{
        destination: `values/integers.xml`,
        format: `android/integers`
     },{
        destination: `values/strings.xml`,
        format: `android/strings`
      }]
    },
  }
}).buildAllPlatforms();