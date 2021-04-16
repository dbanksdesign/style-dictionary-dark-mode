# Style Dictionary Dark Mode Example

This is the example project that goes along with the blog post [Dark Mode with Style Dictionary](https://dbanks.design/blog/dark-mode-with-style-dictionary)

I have found 2 different approaches for implementing dark mode: single-token and multi-file. Both approaches have their pros and cons, so you can decide what works best for you. If you want to skip all the explanation and go straight into the code, here is the repository: [dbanksdesign/style-dictionary-dark-mode][repo]. The repository has 3 branches: 

* [starter](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/starter): the project before any dark mode stuff
* [single-token](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/single-token): the full implementation using the single-token approach
* [multi-file](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/multi-file): the full implementation using the multi-file approach with file extensions. 

This project has 2 branches that map to the 2 different approaches for implementing dark mode: single-token, and multi-file. You can check out either branch, both should have the same end result, but arrive there in different ways. Both approaches have their pros and cons, so I will leave it up to you to decide which is best for your scenario. Also, there might be other approaches that might work better for you (or modifications to either of these approaches). That is what I love about design tokens and Style Dictionary is there is no single right way to do things. Please create issues or let me know if you think of other approaches or modifications to these approaches.

<video loop={true} muted={true} autoplay={true} controls={true} playsinline={true}>
  <source src="preview.mp4" type="video/mp4" />
</video>

This project assumes you have some understanding of [Design Tokens](https://www.designtokens.org/) and [Style Dictionary](https://amzn.github.io/style-dictionary/).

### Project setup

1. Grab the repository code: `git clone https://github.com/dbanksdesign/style-dictionary-dark-mode.git`
1. Get the starter branch: `git fetch && git checkout starter`
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

### Running the Android demo

1. Open Android Studio
1. Click on **Open an existing project**
1. Navigate to the folder you cloned the repository into and select the **android** folder
1. Android Studio should run for a bit syncing dependencies and whatnot
1. Click the play button at the top to build and run the app in an emulator (you will need to have an emulator downloaded already)

### Running the Web demo

1. Go into the **web/demo** directory with `cd web/demo`
1. Run `npm install` to install dependencies. *This will also create a local dependency on our style dictionary package with a symlink using `npm link`*
1. Run `npm start` to start [11ty](https://www.11ty.dev/)
1. Open **http://localhost:8080** in your browser

## Project structure

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