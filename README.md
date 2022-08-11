# elementCatcher
Access child elements using object syntax.

The overall goal is to reduce the amount of `getElementById()` calls in a document and instead access elements in a object using the element id as the object key.

## Setup
Load *elementCatcher* at the **bottom** of your html file: `<script src='elementCatcher.js'>` or you can add the the `defer` option to your script tag.

Then simply create a new instance with `new elementCatcher()` in your script.

## Options

| Key | Type |Required | Description
| ----------- | ------------ |------------ |------------ |
| id  | string | yes  | The `id` of your *target element*. By default, all children of this element with be catched.  |
| ignoreClass | string | no | Only elements **without**   this class name will be added |
| includeClass | string | no | Only elements **with** this class name will be added |
| directChildren | bool | no | If you only want the direct children of your target element to be added, set this to true. By default, all elements (including "grand children") will be catched.

The *target element* will be catched by default.

### Example 
```javascript
new elementCatcher({
    "id": "someId",
    "ignoreClass": "someClass"
})
```

or

```javascript
new elementCatcher({
    "id": "someId",
    "includeClass": "someClass"
})
```

**Note that there cannot be both a `ìgnoreClass` and `includeClass`** option in the same instance

## Accessing the elements
Lets say I have the following instance:
```javascript
var catcher = new elementCatcher({
    "id": "someId",
    "includeClass": "someClass"
})
```

and this html:
```html
<div id="someId"></div>
```

I could then access the element with:
```javascript
catcher.someId
```

Thus, instead of `document.getElementById("someId")` we do `catcher.someId`.

## Help
For help and or questions, please create an issue.
