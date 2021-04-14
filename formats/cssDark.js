function cssDark({ dictionary, options={} }) {
  const lightTokens = `:root {\n` +
    dictionary.allProperties
      .map(token => {
        let {value} = token;
        let originalValue = token.original.value;
        if (dictionary.usesReference(originalValue)) {
          const reference = dictionary.getReferences(originalValue)[0];
          value = `var(--${reference.name})`
        }
        return `  --${token.name}: ${value};`
      })
      .join('\n') +
    `\n}\n`;

  const darkTokens = `@media (prefers-color-scheme: dark) {\n:root {\n` +
    dictionary.allProperties
      // for the prefers-color-scheme: dark media query
      // we only want to output the tokens that have dark values
      .filter(token => token.darkValue)
      .map(token => {
        let value = token.darkValue;
        let originalValue = token.original.darkValue;
        if (dictionary.usesReference(originalValue)) {
          const reference = dictionary.getReferences(originalValue)[0];
          value = `var(--${reference.name})`
        }
        return `  --${token.name}: ${value};`
      })
      .join(`\n`) +
    `\n}\n}`;

  // output both light and dark tokens
  return `${lightTokens}\n\n${darkTokens}`;
}

module.exports = cssDark;