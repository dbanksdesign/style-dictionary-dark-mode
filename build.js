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
  // custom actions
  action: {
    generateColorsets: require('./actions/ios/colorsets'),
    generateGraphics: require('./actions/generateGraphics'),
  },
  // custom transforms
  transform: {
    'attribute/cti': require('./transforms/attributeCTI'),
    'colorRGB': require('./transforms/colorRGB'),
    'size/remToFloat': require('./transforms/remToFloat')
  },
  // custom formats
  format: {
    swiftColor: require('./formats/swiftColor'),
    swiftImage: require('./formats/swiftImage'),
  },
  
  source: [
    `tokens/**/*.json5`
  ],
  
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables.css`,
        format: `css/variables`,
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
    
    assets: {
      transforms: [`attribute/cti`,`color/hex`,`size/remToFloat`,`name/ti/camel`],
      buildPath: `${webPath}/images/`,
      iosPath,
      androidPath,
      actions: [`generateGraphics`]
    },
    
    iosColors: {
      buildPath: iosPath,
      transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
      actions: [`generateColorsets`]
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
    
    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values/colors.xml`,
        format: `android/resources`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          outputReferences: true
        },
      },{
        destination: `values/font_dimens.xml`,
        filter: (token) => token.attributes.category === `size` &&
          token.attributes.type === `font`,
        format: `android/resources`
      },{
        destination: `values/dimens.xml`,
        filter: (token) => token.attributes.category === `size` &&
          token.attributes.type !== `font`,
        format: `android/resources`
      }]
    }
  }
}).buildAllPlatforms();