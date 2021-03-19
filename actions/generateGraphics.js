const fs = require('fs-extra');
const template = require('lodash/template');
const generateImageset = require('./ios/imagesets');
const androidVector = require('./androidVector');

module.exports = {
  do: (dictionary, config) => {
    const { androidPath, iosPath, buildPath } = config;
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const { name, value, darkValue } = token;
        let svg, svgDark;
        // Read the file from the token's value and turn it into a lodash template
        const src = template( fs.readFileSync(value) );
        
        // Generate the final SVG output by passing in the dictionary
        // to resolve the references
        svg = src(dictionary.properties);
        
        // Make sure the directory exists and write the new SVG file
        const outputPath = `${buildPath||''}${name}.svg`;
        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, svg);
        console.log(`✔︎  ${outputPath}`);
        
        if (darkValue) {
          const src = template( fs.readFileSync(darkValue) );
          svgDark = src(dictionary.properties);
          
          const outputPath = `${buildPath||''}${name}-dark.svg`;
          fs.ensureFileSync(outputPath);
          fs.writeFileSync(outputPath, svgDark);
          console.log(`✔︎  ${outputPath}`);
        }
        
        androidVector({
          androidPath,
          name,
          svg,
          svgDark
        });
        
        generateImageset({
          iosPath,
          name,
          svg,
          svgDark
        });
      });
  },
  
  undo: (dictionary, config) => {
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const outputPath = `${config.buildPath||''}${token.name}.svg`;
        fs.removeSync(outputPath);
        console.log(`- ${outputPath}`);
        
        const androidPath = `${config.androidPath}${token.name}.xml`;
        fs.removeSync(androidPath);
        console.log(`- ${androidPath}`);
      });
  }
}