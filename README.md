# Style Dictionary Dark Mode Example

This is the example project that goes along with the blog post [Dark Mode with Style Dictionary](https://dbanks.design/blog/dark-mode-with-style-dictionary)

This project has 2 branches that map to the 2 different approaches for implementing dark mode: single-token, and multi-file. You can check out either branch, both should have the same end result, but arrive there in different ways. Both approaches have their pros and cons, so I will leave it up to you to decide which is best for your scenario. Also, there might be other approaches that might work better for you (or modifications to either of these approaches). That is what I love about design tokens and Style Dictionary is there is no single right way to do things. Please create issues or let me know if you think of other approaches or modifications to these approaches.

This project assumes you have some understanding of [Design Tokens](https://www.designtokens.org/) and [Style Dictionary](https://amzn.github.io/style-dictionary/).

## How to run this

1. Clone or fork this repository
1. Choose which approach you want to take and check out the appropriate branch: `git fetch && git checkout single-token` or `git fetch && git checkout multi-file`. The **main** branch uses the single-token approach.
1. `npm ci` to install dependencies
1. `npm run build` will run Style Dictionary and generate the artifacts for Android, iOS, and web
1. `npm start` will run the build command and start a watcher to watch for changes and rebuild

### Running the iOS sample app

1. Make sure you have Xcode 12 or greater installed
1. Make sure you have Cocoapods installed
1. Go into the **ios/demo** directory, `cd ios/demo`
1. Run `pod install`
1. Open the Xcode workspace: `open StyleDictionaryDarkModeDemo.xcworkspace`
1. Click the ▶️ button to build and run the app

### Running the Android sample app

1. 

### Running the Web sample app

### Project structure

Design token source:
* **tokens/** Source design token files
* **assets/** SVG graphics that use design tokens. These will get transformed and output

Custom Style Dictionary code:
* **actions/** custom [Style Dictionary action]() code
* **formats/** custom [Style Dictionary format]() code
* **transforms/** custom [Style Dictionary transforms]()

Output and demo directories
* **android/designtokens** Generated Style Dictionary files for Android. This doesn't follow the same pattern as the other platforms
* **android/demo** Android demo
* **ios/dist** Generated Style Dictionary files for iOS
* **ios/demo** iOS demo
* **web/dist** Generated Style Dictionary files for web
* **web/demo**



## Special thanks

* SVG graphics from [undraw.co](https://undraw.co/)