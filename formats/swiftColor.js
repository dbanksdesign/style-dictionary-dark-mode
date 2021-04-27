
module.exports = function({ dictionary, options }) {
  return `import UIKit
import SwiftUI

class DarkModeDesignTokens {}
let bundle = Bundle(for: DarkModeDesignTokens.self)

extension Color {\n` +
  dictionary.allProperties.map(token => {
    return `  public static var ${token.name}: Color {
    return Color.init("${token.name}", bundle: bundle)
  }`
  }).join(`\n`) +
  `\n}`
}