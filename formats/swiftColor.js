/**
 * This custom format creates an extension of the SwiftUI Color
 * class and adds all the color tokens as static variables so that
 * you can reference a color token like: `Color.backgroundPrimary`. 
 * It will handle dark mode by using the colorsets and references.
 * 
 * @example
 * ```swift
 * Text("Hello, World!")
 *   .backgroundColor(Color.backgroundPrimary)
 *   .foregroundColor(Color.fontPrimary)
 * ```
 */
module.exports = function({ dictionary, options }) {
  return `import SwiftUI

class DarkModeDesignTokens {}
let bundle = Bundle(for: DarkModeDesignTokens.self)

extension Color {\n` +
  dictionary.allProperties.map(token => {
    if (token.attributes.category === `color`) {
      let value;
      // if the token does not have a reference or has a darkValue
      // use the colorset of the same name
      // else use the reference name
      if (options.outputReferences) {
        // if it has a dark value -> use the colorset (all colors with darkValue have a colorset)
        if (token.darkValue) {
          value = `Color.init("${token.name}", bundle: bundle)`;
        // if it is a reference -> refer to the Color extension name
        } else if (dictionary.usesReference(token.original.value)) {
          const reference = dictionary.getReferences(token.original.value)[0];
          value = `Color.${reference.name}`
        // default to using the colorset
        } else {
          value = `Color.init("${token.name}", bundle: bundle)`
        }
      } else {
        value = `Color.init("${token.name}", bundle: bundle)`;
      }
      return `  public static var ${token.name}: Color {
    return ${value}
  }`
    }
  }).join(`\n`) +
  `\n}`
}