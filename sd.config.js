const StyleDictionary = require('style-dictionary');
const attributeCTI = require('./transforms/attributeCTI');

const { formattedVariables} = StyleDictionary.formatHelpers;

function darkAndroid(args) {
  const dictionary = Object.assign({}, args.dictionary);
  // Override each token's "value" with "darkValue"
  dictionary.allProperties = dictionary.allProperties.map(token => {
    return Object.assign({}, token, {
      value: token.darkValue
    });
  });
  
  // Use the built-in 'android/resources' format
  // but with our customized dictionary object so it will output the darkValue
  // instead of the value
  return StyleDictionary.format['android/resources']({ ...args, dictionary })
}

function cssVariable(token) {
  if (token.darkValue) {
    
  }
}

/*
We want to output all the tokens using the value (and use output references).
Then, for tokens with a `darkValue` we want to output those in a media query block
*/

module.exports = {
  source: [
    `tokens/**/*.+(js|json5)`
  ],
  transform: {
    'attribute/cti': attributeCTI,
    'colorRGB': require('./transforms/colorRGB')
  },
  action: {
    iOSColorAssets: require('./actions/ios/colorsets'),
    generateSVG: require('./actions/generateSVG'),
    iOSImages: require('./actions/ios/imagesets')
  },
  format: {
    darkAndroid,
    swiftImage: require('./formats/swiftImage'),
    swift: require('./formats/swift'),
    darkModeCSS: ({ dictionary, options={} }) => {
      const darkTokens = `@media (prefers-color-scheme: dark) {\n:root{\n` +
        dictionary.allProperties
          .filter(token => token.darkValue)
          .map(token => {
            let value = token.darkValue;
            let originalValue = token.original.darkValue;
            if (dictionary.usesReference(originalValue)) {
              const reference = dictionary.getReference(originalValue);
              value = `var(--${reference.name})`
            }
            return `--${token.name}: ${value};`
          }) +
          `\n}\n}`;
      const lightTokens = `:root {` +
      dictionary.allProperties
        .map(token => {
          let {value} = token;
          let originalValue = token.original.value;
          if (dictionary.usesReference(originalValue)) {
            const reference = dictionary.getReference(originalValue);
            value = `var(--${reference.name})`
          }
          return `--${token.name}: ${value};`
        })
        .join('\n') +
        `}\n}`;
      return `${lightTokens}\n\n${darkTokens}`;
    }
  },
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: `build/web/`,
      files: [{
        destination: `variables.css`,
        format: `darkModeCSS`,
        options: {
          outputReferences: true
        }
      }]
    },
    iOS: {
      buildPath: `ios/dist/`,
      transforms: [`attribute/cti`,`name/ti/camel`,`size/swift/remToCGFloat`],
      files: [{
        destination: `Color.swift`,
        format: `swift`,
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
      buildPath: "ios/dist/",
      transforms: ["attribute/cti","colorRGB","name/ti/camel"],
      actions: [`iOSColorAssets`]
    },
    
    iOSImages: {
      buildPath: "ios/dist/",
      transforms: ["attribute/cti","color/hex","name/ti/camel"],
      actions: [`iOSImages`]
    },
    
    asset: {
      transformGroup: `assets`,
      buildPath: `web/dist/`,
      androidPath: `android/designtokens/src/main/res/drawable/`,
      actions: [`generateSVG`]
    },
    
    android: {
      transformGroup: "android",
      buildPath: "android/designtokens/src/main/res/",
      files: [{
        destination: "values/colors.xml",
        format: "android/resources",
        filter: (token) => token.attributes.category === 'color',
        options: {
          // this is important!
          // this will keep token references intact so that we don't need
          // to generate *all* color resources for dark mode, only
          // the specific ones that change
          outputReferences: true
        },
      },{
        destination: "values/font_dimens.xml",
        format: "android/fontDimens"
      },{
        destination: "values/dimens.xml",
        format: "android/dimens"
      },{
        destination: "values/integers.xml",
        format: "android/integers"
     },{
        destination: "values/strings.xml",
        format: "android/strings"
      },{
        destination: "values-night/colors.xml",
        format: "darkAndroid",
        filter: (token) => token.darkValue
      }]
    },
  }
};