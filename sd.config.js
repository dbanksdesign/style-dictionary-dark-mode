module.exports = {
  source: [
    `tokens/**/*.+(js|json5)`
  ],
  transform: {
    'attribute/cti': require('./transforms/attributeCTI'),
    'colorRGB': require('./transforms/colorRGB')
  },
  action: {
    generateColorsets: require('./actions/ios/colorsets'),
    generateGraphics: require('./actions/generateGraphics'),
  },
  format: {
    androidDarkResources: require('./formats/androidDarkResources'),
    swiftImage: require('./formats/swiftImage'),
    swift: require('./formats/swift'),
    cssDark: require('./formats/cssDark')
  },
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: `web/dist/`,
      files: [{
        destination: `variables.css`,
        format: `cssDark`,
        filter: (token) => token.attributes.category !== 'image',
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
      buildPath: `ios/dist/`,
      transforms: [`attribute/cti`,`colorRGB`,`name/ti/camel`],
      actions: [`generateColorsets`]
    },
    
    asset: {
      transforms: [`attribute/cti`,`color/hex`,`name/ti/camel`],
      buildPath: `web/dist/`,
      iosPath: `ios/dist/`,
      androidPath: `android/designtokens/src/main/res/`,
      actions: [`generateGraphics`]
    },
    
    android: {
      transformGroup: `android`,
      buildPath: `android/designtokens/src/main/res/`,
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
      },{
        // Here we are outputting a 'night' resource file that only has
        // the colors that have dark values. All the references
        // from the earlier file will properly reference
        // these colors if the OS is set to night mode.
        destination: `values-night/colors.xml`,
        format: `androidDarkResources`,
        filter: (token) => token.darkValue
      }]
    },
  }
};