const fs = require('fs-extra');
const sharp = require('sharp');
const { contents, darkAppearance, idiom, hcAppearance } = require('./consts');

/**
 * This function will generate an imageset for iOS
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a PNG. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.iosPath - The build path for iOS. This will be defined in the configuration
 * @param {String} options.svgDark - The dark version of the SVG
 */
function generateImageset({ svg, svgDark, name, iosPath, svgHc, svgHcDark }) {
  const outputPath = `${iosPath}StyleDictionary.xcassets/${name}.imageset`;
  fs.ensureDirSync(outputPath);
  
  const filename = `img.png`;
  const imageset = {
    ...contents,
    images: [{
      idiom,
      filename
    }]
  }

  // Here we are using the sharp library for image processing that will take
  // the SVG content and render it as a PNG
  // https://sharp.pixelplumbing.com/api-constructor
  sharp(Buffer.from(svg, `utf-8`), { density: 300 })
    .toFile(`${outputPath}/${filename}`, (err) => {
      if (!err) {
        console.log(`✔︎  ${outputPath}/${filename}`);
      } else {
        console.log(err);
      }
    });
    
  if (svgDark) {
    const filename = `img-dark.png`;
    imageset.images.push({
      idiom,
      appearances: [darkAppearance],
      filename
    });
    sharp(Buffer.from(svgDark, `utf-8`), { density: 300 })
      .toFile(`${outputPath}/${filename}`, (err) => {
        if (!err) {
          console.log(`✔︎  ${outputPath}/${filename}`);
        } else {
          console.log(err);
        }
      });
  }
  
  if (svgHcDark) {
    const filename = `img-hc-dark.png`;
    imageset.images.push({
      idiom,
      appearances: [darkAppearance, hcAppearance],
      filename
    });
    sharp(Buffer.from(svgHcDark, `utf-8`), { density: 300 })
      .toFile(`${outputPath}/${filename}`, (err) => {
        if (!err) {
          console.log(`✔︎  ${outputPath}/${filename}`);
        } else {
          console.log(err);
        }
      });
  }
  
  if (svgHc) {
    const filename = `img-hc.png`;
    imageset.images.push({
      idiom,
      appearances: [hcAppearance],
      filename
    });
    sharp(Buffer.from(svgHc, `utf-8`), { density: 300 })
      .toFile(`${outputPath}/${filename}`, (err) => {
        if (!err) {
          console.log(`✔︎  ${outputPath}/${filename}`);
        } else {
          console.log(err);
        }
      });
  }
  
  // Lastly, write the Contents.json file with the updated content
  fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
}

module.exports = generateImageset;