const fs = require('fs-extra');
const template = require('lodash/template');
const iosImageset = require('./ios/imagesets');
const androidVector = require('./android/vector');

/**
 * This is a custom [Style Dictionary action](https://amzn.github.io/style-dictionary/#/actions)
 * that will generate all of the graphics for each platform (android, ios, web) based on
 * the SVG tokens defined in our Style Dictionary.
 */
module.exports = {
  // An action in Style Dictionary has `do` and `undo` functions, which take the transformed
  // and resolved dictionary object containing all the tokens and the platform configuration
  // of the platform that called this action. 
  do: (dictionary, config) => {
    const { androidPath, iosPath, buildPath } = config;
    
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const { name, value, darkValue, hcValue, hcDarkValue } = token;
        
        // Read the file from the token's value and turn it into a 
        // [lodash template](https://lodash.com/docs/4.17.15#template)
        // This is why the original SVG files have `<%= color.brand.primary.value %>` in them.
        // That is the lodash template's way of using data in the template.
        // `src` is now a function that will accept a data object that will be used
        // to generate a finished output. 
        const src = template( fs.readFileSync(value) );
        
        // Generate the final SVG output by passing in the dictionary
        // to resolve the references. `svg` is the finished SVG string
        // that can now be written to a file or passed to other functions
        // to translate it to a PNG or Android Vector Drawable
        const svg = src(dictionary.properties);
        let svgDark, svgHc, svgHcDark;
        
        // Make sure the directory exists and write the new SVG file
        const outputPath = `${buildPath||''}${name}-light.svg`;
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
        
        if (hcDarkValue) {
          const src = template( fs.readFileSync(hcDarkValue) );
          svgHcDark = src(dictionary.properties);
          
          const outputPath = `${buildPath||''}${name}-hc-dark.svg`;
          fs.ensureFileSync(outputPath);
          fs.writeFileSync(outputPath, svgHcDark);
          console.log(`✔︎  ${outputPath}`);
        }
        
        if (hcValue) {
          const src = template( fs.readFileSync(hcValue) );
          svgHc = src(dictionary.properties);
          
          const outputPath = `${buildPath||''}${name}-hc.svg`;
          fs.ensureFileSync(outputPath);
          fs.writeFileSync(outputPath, svgHc);
          console.log(`✔︎  ${outputPath}`);
        }
        
        // This will take the SVG and convert it into Android Vector Drawable format
        androidVector({ androidPath, name, svg, svgDark, svgHc, svgHcDark });
        
        // This will take the SVG and convert it to a PNG and create the metadata
        // for an iOS imageset
        iosImageset({ iosPath, name, svg, svgDark, svgHc, svgHcDark });
      });
  },
  
  undo: (dictionary, config) => {
    // no clean action
  }
}