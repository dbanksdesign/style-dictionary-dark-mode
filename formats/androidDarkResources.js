const StyleDictionary = require('style-dictionary');

function androidDarkResources(args) {
  const dictionary = Object.assign({}, args.dictionary);
  // Override each token's `value` with `darkValue`
  dictionary.allProperties = dictionary.allProperties.map(token => {
    return Object.assign({}, token, {
      value: token.darkValue
    });
  });
  
  // Use the built-in 'android/resources' format
  // but with our customized dictionary object so it will output the darkValue
  // instead of the value
  return StyleDictionary.format['android/resources']({ ...args, dictionary })
}

module.exports = androidDarkResources;