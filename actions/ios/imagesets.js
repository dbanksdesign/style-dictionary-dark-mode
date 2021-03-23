const fs = require('fs-extra');
const sharp = require('sharp');
const { contents, darkAppearance, idiom } = require('./consts');

function generateImageset({ svg, name, iosPath, theme }) {
  let filename = `img.png`;
  let image = {
    idiom
  };
  let imageset = {
    ...contents,
    images: []
  }
  const outputPath = `${iosPath}StyleDictionary.xcassets/${name}.imageset`;
  fs.ensureDirSync(outputPath);
  
  // Image set already exists
  if (fs.existsSync(`${outputPath}/Contents.json`)) {
    imageset = fs.readJsonSync(`${outputPath}/Contents.json`);
  }
  
  if (theme === `dark`) {
    filename = `img-dark.png`;
    image.appearances = [darkAppearance];
  }
  
  image.filename = filename;
  imageset.images.push(image);

  // https://sharp.pixelplumbing.com/api-constructor
  sharp(Buffer.from(svg, `utf-8`))
    .toFile(`${outputPath}/${filename}`, (err) => {
      if (!err) {
        console.log(`✔︎  ${outputPath}/${filename}`);
      } else {
        console.log(err);
      }
    });

  fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
}

module.exports = generateImageset;