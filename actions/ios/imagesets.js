const fs = require('fs-extra');
const sharp = require('sharp');
const { contents, darkAppearance, idiom } = require('./consts');

function generateImageset({ svg, svgDark, name, iosPath }) {
  const imageset = {
    ...contents,
    images: [{
      idiom,
      filename: `img.png`
    }]
  }
  const outputPath = `${iosPath}StyleDictionary.xcassets/${name}.imageset`;
  fs.ensureDirSync(outputPath);

  // https://sharp.pixelplumbing.com/api-constructor
  sharp(Buffer.from(svg, `utf-8`))
    .toFile(`${outputPath}/img.png`, (err) => {
      if (!err) {
        console.log(`✔︎  ${outputPath}/img.png`);
      } else {
        console.log(err);
      }
    });
    
  if (svgDark) {
    imageset.images.push({
      idiom,
      appearances: [darkAppearance],
      filename: `img-dark.png`
    });
    sharp(Buffer.from(svgDark, `utf-8`))
      .toFile(`${outputPath}/img-dark.png`, (err) => {
        if (!err) {
          console.log(`✔︎  ${outputPath}/img-dark.png`);
        } else {
          console.log(err);
        }
      });
  }
  fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
}

module.exports = generateImageset;