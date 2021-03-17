
module.exports = function({ dictionary, options }) {
  return `import UIKit
import SwiftUI

class DarkModeDesignTokens {}
let bundle = Bundle(for: DarkModeDesignTokens.self)
let uitrait = UITraitCollection.init();

extension Color {\n` +
  dictionary.allProperties.map(token => {
    if (token.attributes.category === `color`) {
      let value;
      // if the token does not have a reference or has a darkValue
      // use the colorset of the same name
      // else use the reference name
      if (options.outputReferences) {
        if (!dictionary.usesReference(token.original.value) || token.darkValue) {
          value = token.name;
        } else {
          const reference = dictionary.getReference(token.original.value);
          value = reference.name;
        }
      }
      return `  public static var ${token.name}: Color {
    return Color.init("${value}", bundle: bundle)
  }`
    }
  }).join(`\n`) +
  `\n}`
}