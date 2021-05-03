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

/**
 * This function will wrap a built-in format and replace `.value` with `.darkValue`
 * if a token has a `.darkValue`.
 * @param {String} format - the name of the built-in format
 * @returns {Function}
 */
function darkFormatWrapper(format) {
  return function(args) {
    const dictionary = Object.assign({}, args.dictionary);
    // Override each token's `value` with `darkValue`
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const {darkValue} = token;
      if (darkValue) {
        return Object.assign({}, token, {
          value: token.darkValue
        });
      } else {
        return token;
      }
    });
    
    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({ ...args, dictionary })
  }
}

function hcFormatWrapper(format) {
  return function(args) {
    const dictionary = Object.assign({}, args.dictionary);
    // Override each token's `value` with `hcValue`
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const {hcValue} = token;
      if (hcValue) {
        return Object.assign({}, token, {
          value: token.hcValue
        });
      } else {
        return token;
      }
    });
    
    // Use the built-in format but with our customized dictionary object
    // so it will output the hcValue instead of the value
    return StyleDictionary.format[format]({ ...args, dictionary })
  }
}

function hcDarkFormatWrapper(format) {
  return function(args) {
    const dictionary = Object.assign({}, args.dictionary);
    // Override each token's `value` with `hcDarkValue`
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const {hcDarkValue} = token;
      if (hcDarkValue) {
        return Object.assign({}, token, {
          value: token.hcDarkValue
        });
      } else {
        return token;
      }
    });
    
    // Use the built-in format but with our customized dictionary object
    // so it will output the hcValue instead of the value
    return StyleDictionary.format[format]({ ...args, dictionary })
  }
}

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
    androidDark: darkFormatWrapper(`android/resources`),
    cssDark: darkFormatWrapper(`css/variables`),
    cssHcDark: hcDarkFormatWrapper(`css/variables`),
    cssHc: hcFormatWrapper(`css/variables`),
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
      },{
        destination: `variables-dark.css`,
        format: `cssDark`,
        filter: (token) => token.darkValue && token.attributes.category === `color`
      },{
        destination: `variables-hc.css`,
        format: `cssHc`,
        filter: (token) => token.hcValue && token.attributes.category === `color`
      },{
        destination: `variables-hc-dark.css`,
        format: `cssHcDark`,
        filter: (token) => token.hcDarkValue && token.attributes.category === `color`
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
        format: `androidDark`,
        filter: (token) => token.darkValue && token.attributes.category === `color`
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