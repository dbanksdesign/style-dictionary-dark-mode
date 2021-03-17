const fs = require('fs-extra');
const { contents, darkAppearance, idiom, hcAppearance } = require('./consts');

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions. A colorset
 */
module.exports = {
  do: (dictionary, platform) => {
    const assetPath = `${platform.buildPath}/StyleDictionary.xcassets`;
    
    dictionary.allProperties
      .filter(token => token.attributes.category === `color`)
      .forEach(token => {
        const colorset = {
          colors: [],
          ...contents
        }

        // default light value
        colorset.colors.push({
          idiom,
          color: {
            'color-space': `srgb`,
            components: token.value
          },
        });
        
        if (token.darkValue) {
          colorset.colors.push({
            idiom,
            color: {
              'color-space': `srgb`,
              components: token.darkValue
            },
            appearances: [darkAppearance]
          });
        }
        
        if (token.hcValue) {
          colorset.colors.push({
            idiom,
            appearances: [hcAppearance],
            color: {
              'color-space': 'srgb',
              components: token.hcValue
            }
          });
        }
        
        if (token.hcdarkValue) {
          colorset.colors.push({
            idiom,
            color: {
              'color-space': 'srgb',
              components: token.hcdarkValue
            },
            appearances: [hcAppearance, darkAppearance]
          });
        }
        
        const colorsetPath = `${assetPath}/${token.name}.colorset`;
        
        fs.ensureDirSync(colorsetPath);
        fs.writeFileSync(`${colorsetPath}/Contents.json`, JSON.stringify(colorset, null, 2));
      });
      
      fs.writeFileSync(`${assetPath}/Contents.json`, JSON.stringify(contents, null, 2));
  },
  undo: function(dictionary, platform) {
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const assetPath = `${platform.buildPath}/StyleDictionary.xcassets`;
        const colorsetPath = `${assetPath}/${token.name}.colorset`;
        fs.removeSync(colorsetPath);
        console.log(`- ${colorsetPath}`);
      });
  }
}