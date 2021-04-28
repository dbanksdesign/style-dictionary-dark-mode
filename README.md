# Style Dictionary Dark Mode Example

This is the example project that goes along with the blog post [Dark Mode with Style Dictionary](https://dbanks.design/blog/dark-mode-with-style-dictionary) This repository has 3 branches: 

* [main](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/main): the project before any dark mode stuff
* [single-token](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/single-token): the full implementation using the single-token approach
* [multi-file](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/multi-file): the full implementation using the multi-file approach with file extensions. 

Both single-token and multi-file branches should have the same end result, but arrive there in different ways. Both methods have their pros and cons, so I will leave it up to you to decide which is best for your scenario. Also, there might be other methods that might work better for you (or modifications to either of these methods). That is what I love about design tokens and Style Dictionary is there is no single right way to do things. Please create issues or let me know if you think of other methods or modifications to these methods.

This project assumes you have some understanding of [Design Tokens](https://www.designtokens.org/) and [Style Dictionary](https://amzn.github.io/style-dictionary/). Both of the methods in this demo use new features in the [3.0 release of Style Dictionary](https://amzn.github.io/style-dictionary/#/version_3).

## Project setup

1. Grab this repository code: `git clone https://github.com/dbanksdesign/style-dictionary-dark-mode.git`
1. Get the branch you want to use: `git fetch && git checkout multi-file` or `git fetch && git checkout single-token`
1. Install dependencies: `npm ci`
1. Run Style Dictionary: `npm run build`
1. You should see Style Dictionary run and generate some files.
1. `npm run build` will run Style Dictionary and generate the artifacts for Android, iOS, and web
1. `npm start` will run the build command and start a watcher to watch for changes and rebuild

### Running the iOS demo

1. Make sure you have Xcode 12 or greater installed
1. You will need [CocoaPods](https://cocoapods.org/) installed
1. Go into the **ios/demo** directory with `cd ios/demo`
1. Run `pod install` to install the style dictionary CocoaOod
1. Open the Xcode workspace: `open StyleDictionaryDarkModeDemo.xcworkspace`
1. Click the ▶️ button to build and run the demo

*Note: if you add new files in the Style Dictionary configuration, you will need to run `pod install` in the `ios/demo` directory again so CocoaPods can link the newly generated files into Xcode*

### Running the Android demo

1. Open Android Studio
1. Click on **Open an existing project**
1. Navigate to the folder you cloned the repository into and select the **android** folder
1. Android Studio should run for a bit syncing dependencies and whatnot
1. Click the ▶️ button at the top to build and run the app in an emulator (you will need to have an emulator downloaded already)

After you make any changes to the design tokens, you just need to rebuild Style Dictionary with `npm run build` in the root directory. Or you can use `npm start` which will watch for changes. After Style Dictionary builds, you can rebuild the Android application by clicking the ▶️ button in Android Studio.

### Running the Web demo

1. Go into the **web/demo** directory with `cd web/demo`
1. Run `npm install` to install dependencies. *This will also create a local dependency on our style dictionary package with a symlink using `npm link`*
1. Run `npm start` to start [11ty](https://www.11ty.dev/)
1. Open **http://localhost:8080** in your browser

*Note: if you make any changes you will need to restart the 11ty server because it passes through the generated files from Style Dictionary*

## Project structure

Design token source:
* **tokens/** Source design token files. The source token files are written in [JSON5](https://json5.org/) so that I can include comments
* **assets/** SVG graphics that use design tokens.

Custom Style Dictionary code:
* **actions/** custom [Style Dictionary action](https://amzn.github.io/style-dictionary/#/actions) code
* **formats/** custom [Style Dictionary format](https://amzn.github.io/style-dictionary/#/formats) code
* **transforms/** custom [Style Dictionary transforms](https://amzn.github.io/style-dictionary/#/transforms)

Output and demo directories:
* **android/designtokens** Generated Style Dictionary files for Android. This doesn't follow the same pattern as the other platforms because directory structure matters for Android.
* **android/demo** Android demo
* **ios/dist** Generated Style Dictionary files for iOS
* **ios/demo** iOS demo using [CocoaPods](https://cocoapods.org/) and [SwiftUI](https://developer.apple.com/xcode/swiftui/)
* **web/dist** Generated Style Dictionary files for web
* **web/demo** Web demo using [Eleventy](https://www.11ty.dev/)

## How this works

The main branch of this repository does **NOT** have dark mode implemented. Instead, it is the project setup before the dark mode implementation. The branches, multi-file and single-token are the implementations in 2 different methods. You can take a look at the pull requests to see how each method works. Or you can check out the 

## Multi-file method

`git fetch && git checkout multi-file`

The multi-file method is based on the [multi-brand-multi-platform example](https://github.com/amzn/style-dictionary/tree/main/examples/advanced/multi-brand-multi-platform) built by [Cristiano Rastelli](https://twitter.com/areaweb). This method also resembles how Android handles color modes: selectively using different resource files based on context. The main idea with this method is to run Style Dictionary multiple times with varying sets of token files and outputting different sets of artifacts, one for each color mode: light and dark. Style Dictionary takes all the source token files it finds from the config and does a deep merge  to create one big object. Therefore you can run Style Dictionary with one set of source files and rerun it with some additional files that override specific tokens to generate a collection of artifacts for light mode and dark mode.

```json
// color/background.json
{
  "color": {
    "background": {
      "primary": { "value": "{color.core.neutral.0.value}" }
    }
  }
}
```

```json
// color-dark/background.json
{
  "color": {
    "background": {
      "primary": { "value": "{color.core.neutral.1000.value}" }
    }
  }
}
```

Notice that the object structure of the token files is the same for both light/default and dark mode. We are only overriding the value. Then we run Style Dictionary once with the only light/default token file and once with the dark token file to generate a set of light-mode outputs and dark-mode outputs.

## Single-token method

`git fetch && git checkout single-token`

In this method we include a separate dark value in the token itself, rather than having a separate set of dark token files like in the multi-file method. The single-token method resembles how iOS organizes different color modes inside a single color or image asset rather than having separate folders with all colors or images of a single mode. Here is what a token would look like in the single-token method:

```json
// tokens/color/background.json5
{
  "color": {
    "background": {
      "primary": {
        "value": "{color.core.neutral.0.value}",
        "darkValue": "{color.core.neutral.1000.value}"
      }
    }
  }
}
```

## Special thanks

* SVG graphics from [undraw.co](https://undraw.co/)