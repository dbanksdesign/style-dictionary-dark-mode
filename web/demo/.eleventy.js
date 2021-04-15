const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  // Copy the `image` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  // Copy generated style dictionary files
  // The main package we are defining as an npm module and this demo package depends on it
  eleventyConfig.addPassthroughCopy({
    "node_modules/style-dictionary-dark-mode/web/dist/variables.css": "css/variables.css",
    "node_modules/style-dictionary-dark-mode/web/dist/variables-dark.css": "css/variables-dark.css",
    "node_modules/style-dictionary-dark-mode/web/dist/images": "images"
  });
}