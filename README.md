# elementCatcher
Get and access child elements under an ID using object syntax.

The overall goal is to reduce the amount of `getElementById()` calls in a document and instead access elements in a object using the element id as the object key.

## Setup
Load *elementCatcher* at the **bottom** of your html file: `<script src='elementCatcher.js'>` or you can add the the `defer` option to your script tag.

Then simply create a new instance with `new elementCatcher()` in your script

## Options

| Key | Required | Description |
| ----------- | ------------ |------------ |
| id  | yes  | The target `id` of your parent element. Elements under this element with be catched. By default **all** elements will be catched. |
| ignoreClass | no | Only elements **without**  with this class name with be added |
| includeClass | no | Only elements **with** this class name with be added |

### Example 
```javascript
new elementLogger({
    "id": "someId",
    "ignoreClass": "someClass"
})
```

or

```javascript
new elementLogger({
    "id": "someId",
    "includeClass": "someClass"
})
```

**Note that there cannot be both a `ìgnoreClass` and `includeClass`** option in the same instance!

## Accessing the elements
Lets say I have the following instance:
```javascript
var catcher = new elementLogger({
    "id": "someId",
    "includeClass": "someClass"
})
```

and this html:
```html
<div id="someId"> </div>
```

I could then access the element with:
`catcher.someId`

Thus, instead of `document.getElementById("someId")` we do `catcher.someId`.

## Help
For help and or questions, please create an issue
