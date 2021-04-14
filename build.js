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

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({
  // custom actions
  action: {
    generateColorsets: require('./actions/ios/colorsets'),
    generateGraphics: require('./actions/generateGraphics'),
  },
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
  // custom formats
  format: {
    swiftColor: require('./formats/swiftColor'),
    swiftImage: require('./formats/swiftImage'),
  },
});

const modes = [`light`,`dark`];

const assets = {
  transforms: [`attribute/cti`,`color/hex`,`size/remToFloat`,`name/ti/camel`],
  buildPath: `${webPath}/images/`,
  iosPath,
  androidPath,
  actions: [`generateGraphics`]
};

const iosColors = {
  buildPath: iosPath,
  transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
  actions: [`generateColorsets`]
};

console.log(`☀️ Building light mode...`);
styleDictionary.extend({
  // Using the include array so that theme token overrides don't show
  // warnings in the console. 
  include: [
    `tokens/**/*!(.${modes.join(`|`)}).+(js|json5)`
  ],
  source: [
    // I know there are no "light" tokens, because default is light mode
    // if you did want to have light mode tokens that aren't the default,
    // uncomment the line below 👇
    // `tokens/**/*.light.+(js|json5)`
  ],

  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables-light.css`,
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
    
    iosColors: Object.assign(iosColors, {
      // mode lets the custom actions know which color mode they are being run on
      mode: `light`
    }),
    
    asset: Object.assign(assets, {
      mode: `light`
    }),
    
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


// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`🌙 Building dark mode...`);
styleDictionary.extend({
  // Using the include array so that theme token overrides don't show
  // warnings in the console. 
  include: [
    `tokens/**/*!(.${modes.join(`|`)}).+(js|json5)`
  ],
  source: [
    `tokens/**/*.dark.+(js|json5)`
  ],
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables-dark.css`,
        format: `css/variables`,
        // only putting in the tokens from files with '.dark' in the filepath
        filter: (token) => token.filePath.indexOf(`.dark`) > -1,
        options: {
          outputReferences: true
        }
      }]
    },
    
    assets: Object.assign(assets, {
      mode: `dark`
    }),
    
    iosColors: Object.assign(iosColors, {
      mode: `dark`
    }),
    
    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values-night/colors.xml`,
        format: `android/resources`,
        // only outputting the tokens from files with '.dark' in the filepath
        filter: (token) => token.filePath.indexOf(`.dark`) > -1
      }]
    }
  }
}).buildAllPlatforms();