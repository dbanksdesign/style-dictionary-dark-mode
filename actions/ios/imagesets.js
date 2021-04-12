const fs = require('fs-extra');
const sharp = require('sharp');
const { contents, darkAppearance, idiom } = require('./consts');

/**
 * This function will generate an imageset for iOS
 * @param {Object} options
 * @param {String} options.svg - The content of the SVG that will be turned into a PNG. The SVG content at this point should have had all the token references inside of it resolved.
 * @param {String} options.name - The name of the image token
 * @param {String} options.iosPath - The build path for iOS. This will be defined in the configuration
 * @param {String} options.mode - The current mode (light or dark) Style Dictionary is building in.
 */
function generateImageset({ svg, name, iosPath, mode }) {
  let imageset; // This will hold the JSON data for the Contents.json file
  
  const outputPath = `${iosPath}StyleDictionary.xcassets/${name}.imageset`;
  fs.ensureDirSync(outputPath);
  
  // The imageset might already exist because Style Dictionary is run multiple
  // times with different configurations. If the imageset already exists we want
  // to modify it rather than writing over it.
  if (fs.existsSync(`${outputPath}/Contents.json`)) {
    imageset = fs.readJsonSync(`${outputPath}/Contents.json`);
  } else {
    imageset = {
      ...contents,
      images: []
    }
  }
  
  let filename = `img.png`;
  let image = {
    idiom
  };
  
  if (mode === `dark`) {
    filename = `img-dark.png`;
    image.appearances = [darkAppearance];
  }
  
  // Add the image to the images array of the imageset object.
  image.filename = filename;
  imageset.images.push(image);

  // Here we are using the sharp library for image processing that will take
  // the SVG content
  // https://sharp.pixelplumbing.com/api-constructor
  sharp(Buffer.from(svg, `utf-8`), {
      density: 300,
    })
    .toFile(`${outputPath}/${filename}`, (err) => {
      if (!err) {
        console.log(`✔︎  ${outputPath}/${filename}`);
      } else {
        console.log(err);
      }
    });

  // Lastly, write the Contents.json file with the updated content
  fs.writeFileSync(`${outputPath}/Contents.json`, JSON.stringify(imageset, null, 2));
}

module.exports = generateImageset;