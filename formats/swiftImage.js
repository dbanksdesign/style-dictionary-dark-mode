module.exports = function({ dictionary, options }) {
  return `import UIKit
import SwiftUI

extension Image {\n` +
  dictionary.allProperties.map(token => {
    return `  public static var ${token.name}: Image {
    return Image.init("${token.name}", bundle: bundle)
  }`
  }).join(`\n`) +
  `\n};`
}