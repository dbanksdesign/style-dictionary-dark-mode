const fs = require('fs-extra');
const template = require('lodash/template');
const s2v = require('svg2vectordrawable');

module.exports = {
  do: (dictionary, config) => {
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const src = template( fs.readFileSync(token.value) );
        const output = src(dictionary.properties);
        const outputPath = `${config.buildPath||''}${token.name}.svg`;

        fs.ensureFileSync(outputPath);
        fs.writeFileSync(outputPath, output);
        
        const androidPath = `${config.androidPath}${token.name}.xml`;
        fs.ensureFileSync(androidPath);
        s2v(output).then(xml => {
          setTimeout(() => null, 0); // forces node to not exit immediately
          fs.writeFileSync(androidPath, xml);
          console.log(`✔︎ ${androidPath}`);
        });
        
        if (token.darkValue) {
          const src = template( fs.readFileSync(token.darkValue) );
          const output = src(dictionary.properties);
          const outputPath = `${config.buildPath||''}${token.name}-dark.svg`;
  
          fs.ensureFileSync(outputPath);
          fs.writeFileSync(outputPath, output);
          
          const androidPath = `android/designtokens/src/main/res/drawable-night/${token.name}.xml`;
          fs.ensureFileSync(androidPath);
          s2v(output).then(xml => {
            setTimeout(() => null, 0); // forces node to not exit immediately
            fs.writeFileSync(androidPath, xml);
            console.log(`✔︎ ${androidPath}`);
          });
        }
      });
      
    // dictionary.allProperties
    //   .filter(token => {
    //     return token.attributes.category === `image`
    //   })
    //   .forEach(token => {
    //     // console.log(token.value);
    //     // console.log(token.darkValue);
    //     // // use the svg file as a lodash template
    //     // // the token's value here is the path to the file itself
    //     // const src = template( fs.readFileSync(token.value) );
    //     // // run the lodash template with the dictionary
    //     // // so that it will resolve token references
    //     // const output = src(dictionary.properties);
    //     const outputPath = `${config.buildPath||''}${token.name}.svg`;
    //     fs.ensureFileSync(outputPath);
    //     fs.writeFileSync(outputPath, token.value);
        
    //     const androidPath = `${config.androidPath}${token.name}.xml`;
    //     fs.ensureFileSync(androidPath);
    //     s2v(token.value).then(xml => {
    //       setTimeout(() => null, 0); // forces node to not exit immediately
    //       fs.writeFileSync(androidPath, xml);
    //       console.log(`✔︎ ${androidPath}`);
    //     });
    //   });
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