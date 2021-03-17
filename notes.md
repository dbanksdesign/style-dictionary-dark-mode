
## iOS

The single token approach has an issue with colorsets and generating files from SVGs:
If you *reference* a token that has `darkValue`, we can't follow that reference path...

The single token approach relies on being able to use `outputReferences` because it will create a new file with only tokens that have `darkValue`, assuming those token keys (in Android or CSS) will be referenced by other component-level tokens. This will not work in iOS because colorsets cannot reference another colorset. We could create a Swift class that handles the referencing. We would need to:
* Generate colorsets for any token that is not a reference or has a `darkValue` (semantic layer tokens will have references, but we want to make colorsets for those too)
* Use `outputReferences` in a Swift class except if the token has a `darkValue` or is not a reference, then reference the colorset
**this is done and working**


This could be fine, with the caveat that:
* Using colors in an SVG you have to only use colors that would have a `darkValue` and not a component token that references another token with `darkValue` 
* In iOS we create a helper class or enum that uses `outputReferences`, but only for component-level tokens and not semantic-level. 

These are not issues with the multiple-file approach because we would be running Style Dictionary twice and it would resolve the appropriate value each time. 

We could try to run the generateSVG code in multiple passes to create separate SVG files for iOS. That means we would need to write some custom resolving code that recursively searches the references (in case there are more layers of referencing than just 1).

Note: XCode 12 supports SVG as an imageset filetype, but I am on XCode 11. The same issue remains for the single file approach. 

One not great approach is having a dark version of SVG assets that reference `darkValue` in them... Then in the generate action we look to see if the SVG token has a `darkValue`, if so, generate files from both `value` and `darkValue`. Not super ideal because you would need light and dark values for *every* SVG and they would be 90% the same most of the time (because really you would be just changing `.value` to `.darkValue` mostly). Also, if you have references multiple levels deep (a->b->c->d) then each token would need a `.darkValue` as well for Style Dictionary to resolve it properly. That kinda sucks. In reality, having long reference chains would probably not be a huge issue, but something to consider. 

Is there a way around this?...

In an Android drawable can you reference a color resource? YES you can.
You can use CSS custom properties inside SVG (as long as the SVG is inline in the HTML and not external). Or you can style the SVG with CSS. 

There is not a great way in Style Dictionary to use the `outputReferences` in a custom action, like we do for generating graphics from SVG. 
1. We could reference the token's name directly using `.name` instead of `.value`. This would not work as we would need to format the name like using `var()` or `@color/` for CSS and Android respectively. 

This SVG weirdness stems from getting the source of the SVG too late in the process. If instead we got the source and made it the token's value rather than simply a file path.... This works:

```js
const fs = require('fs-extra');

module.exports = {
  asset: {
    svg: {
      logo: {
        value: fs.readFileSync("assets/svg/logo.svg").toString(),
        darkValue: fs.readFileSync("assets/svg/logo-dark.svg").toString(),
        attributes: {
          width: 128,
          height: 128
        }
      }
    }
  }
}
```

It doesn't solve the problem of having to have 2 different files if you want a dark mode version of a graphic, but does make it a bit easier. We don't need to create a template in the action and process the file at that point. What does it give us? Well, we don't have to process the source ourselves in the action. But we can't use `outputReferences` with this because it will resolve the reference and now the reference is part of a larger string so we can't really undo that reference afterwards... Which maybe that is ok?

In the multi-file approach, we wouldn't need a `darkValue` in svg tokens (unless of course we wanted to change things in the SVG for dark mode, but it wouldn't be *required* to have a valid dark mode graphic). 

In the single-token approach, we would *need* a `darkValue` in svg tokens even if we don't change the SVG itself because we would need to reference `.darkValue` inside the SVG instead of `.value`. This makes sense because in other files like CSS variables and Android resource XMLs we are relying on `outputReferences` to output dark versions of tokens that have dark versions. For Android and CSS we are creating dark files by filtering the tokens to only include ones with `.darkValue` and writing a custom format that replaces `.value` with `.darkValue` and then running the format. 