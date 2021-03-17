const fs = require('fs-extra');
const template = require('lodash/template');
const sharp = require('sharp');
const { contents, darkAppearance, idiom } = require('./consts');

module.exports = {
  do: function(dictionary, config) {
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const imageset = {
          ...contents,
          images: [{
            idiom,
            filename: `img.png`
          }]
        }
        const imagesetPath = `${config.buildPath}StyleDictionary.xcassets/${token.name}.imageset`;
        fs.ensureDirSync(imagesetPath);
        const src = template( fs.readFileSync(token.value) );
        const output = src(dictionary.properties);
        // https://sharp.pixelplumbing.com/api-constructor
        sharp(Buffer.from(output, `utf-8`))
          .toFile(`${imagesetPath}/img.png`, (err) => {
            if (!err) {
              console.log(`✔︎  ${imagesetPath}/img.png`);
            } else {
              console.log(err);
            }
          });
        if (token.darkValue) {
          imageset.images.push({
            idiom,
            appearances: [darkAppearance],
            filename: `img-dark.png`
          });
          const darkSrc = template( fs.readFileSync(token.darkValue) )( dictionary.properties );
          sharp(Buffer.from(darkSrc, `utf-8`))
            .toFile(`${imagesetPath}/img-dark.png`, (err) => {
              if (!err) {
                console.log(`✔︎  ${imagesetPath}/img-dark.png`);
              } else {
                console.log(err);
              }
            });
        }
        fs.writeFileSync(`${imagesetPath}/Contents.json`, JSON.stringify(imageset, null, 2));
      });
  },
  undo: function(dictionary, config) {
    dictionary.allProperties
      .filter(token => {
        return token.attributes.category === `image`
      })
      .forEach(token => {
        const imagesetPath = `${config.buildPath}StyleDictionary.xcassets/${token.name}.imageset`;
        fs.removeSync(imagesetPath);
        console.log(`- ${imagesetPath}`);
      });
  }
}