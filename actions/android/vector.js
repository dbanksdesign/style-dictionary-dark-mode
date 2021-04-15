const fs = require('fs-extra');
const s2v = require('svg2vectordrawable');

function androidVector({ androidPath, svg, svgDark, name }) {
  const outputPath = `${androidPath}drawable/${name}.xml`;
  fs.ensureFileSync(outputPath);
  // s2v will generate an Android vector drawable file
  // from SVG. We are reusing the output already generated above.
  s2v(svg).then(xml => {
    setTimeout(() => null, 0); // forces node to not exit immediately
    fs.writeFileSync(outputPath, xml);
    console.log(`✔︎  ${outputPath}`);
  });
  
  if (svgDark) {
    const outputPath = `${androidPath}drawable-night/${name}.xml`;
    fs.ensureFileSync(outputPath);
    s2v(svgDark).then(xml => {
      setTimeout(() => null, 0); // forces node to not exit immediately
      fs.writeFileSync(outputPath, xml);
      console.log(`✔︎  ${outputPath}`);
    });
  }
}

module.exports = androidVector;