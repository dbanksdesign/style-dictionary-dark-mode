const fs = require('fs-extra');
const { contents, darkAppearance, idiom, hcAppearance } = require('./consts');

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions.
 */
module.exports = {
  // This is going to run once per theme.
  do: (dictionary, platform) => {
    const assetPath = `${platform.buildPath}/StyleDictionary.xcassets`;
    
    // We somehow need to know to only apply certain colors
    // depending on the theme being run. 
    // Also, if you run this multiple times it shouldn't break...
    dictionary.allProperties
      .filter(token => token.attributes.category === `color`)
      .forEach(token => {
        // try to read the colorset first, if it exists we will modify
        // it and save it
        const colorsetPath = `${assetPath}/${token.name}.colorset`;
        fs.ensureDirSync(colorsetPath);
        
        const colorset = {
          colors: [],
          ...contents
        }

        const color = {
          idiom,
          color: {
            'color-space': `srgb`,
            components: token.value
          }
        };
        
        colorset.colors.push(color);
        
        fs.writeFileSync(`${colorsetPath}/Contents.json`, JSON.stringify(colorset, null, 2));
      });
      fs.ensureDirSync(assetPath)
      fs.writeFileSync(`${assetPath}/Contents.json`, JSON.stringify(contents, null, 2));
  },
  undo: function(dictionary, platform) {
    // no undo
  }
}