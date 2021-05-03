const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({
    "node_modules/style-dictionary-dark-mode/web/dist/variables.css": "css/variables.css",
    "node_modules/style-dictionary-dark-mode/web/dist/variables-dark.css": "css/variables-dark.css",
    "node_modules/style-dictionary-dark-mode/web/dist/variables-hc.css": "css/variables-hc.css",
    "node_modules/style-dictionary-dark-mode/web/dist/variables-hc-dark.css": "css/variables-hc-dark.css",
    "node_modules/style-dictionary-dark-mode/web/dist/images": "images"
  });
}