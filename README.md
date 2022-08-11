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
| getElementsWith | string (id, class, all, allAsArray) | yes | Filter elements by type. <li> The `id` option will return all elements with an id as an object key<li> The `class` option will return all elements with a class as an array <li>The `all` option will return all elements as either an id or class array  <li> The `allAsArray` will return all elements as an array|
| ignoreClass | string | no | Only elements **without**   this class name will be added |
| includeClass | string | no | Only elements **with** this class name will be added |
| directChildren | bool | no | If you only want the direct children of your target element to be added, set this to true. By default, all elements (including "grand children") will be catched.


The *target element* will be catched by default.

### Example 
```javascript
new elementCatcher({
    "id": "someId",
    "getElementWidth": "id",
    "includeClass": "someClass"
})
```

**Note that there cannot be both a `ìgnoreClass` and `includeClass`** option in the same instance

## Accessing elements
You can access elements by directly using the object or its array variable `elements`.
### id
Lets say I have the following instance:
```javascript
var catcher = new elementCatcher({
    "id": "someId",
    "getElementsWidth": "id",
    "includeClass": "someClass"
})
```

and this html:
```html
<div id="someId">
    <span id="someSpan">
</div>
```

I could then access the child element with:
```javascript
catcher.someSpan
```

Thus, instead of `document.getElementById("someSpan")` we do `catcher.someSpan`.

### class
This option is useful if you want to iterate trough a class, but generally not useful to get a specific element as the array is dynamic.

Lets say I have the following instance:
```javascript
var catcher = new elementCatcher({
    "id": "someId",
    "getElementsWith": "class",
    "includeClass": "someClass"
})
```

and this html:
```html
<div id="someId">
    <span class="someClass">
</div>
```

I could then access the element with:
```javascript
catcher.elements[0]
```

### all
This option will automatically add an element as a object key if it has an id or add it to the `elements` array if it does not. 

Lets say I have the following instance:
```javascript
var catcher = new elementCatcher({
    "id": "someId",
    "getElementsWidth": "all",
    "includeClass": "someClass"
})
```

and this html:
```html
<div id="someId">
    <span id="someOtherId" class="someClass">
    <span class="someClass">
</div>
```

I could then access the first span element with:
```javascript
catcher.someOtherId
```
and the second span element with:
```javascript
catcher.elements[0]
```

The reason is that if an id exist, it will always be added as a key, not in the `elements` array.

### allAsArray
This option will add all elements to the `elements` array, even tho it has an id.

Lets say I have the following instance:
```javascript
var catcher = new elementCatcher({
    "id": "someId",
    "getElementsWidth": "allAsArray",
})
```

and this html:
```html
<div id="someId">
    <span id="someOtherId" class="someClass">
    <span class="someClass">
</div>
```

I could then access the first span element with:
```javascript
catcher.elements[0]
```
and the second span element with:
```javascript
catcher.elements[1]
```

## Help
For help and or questions, please create an issue.
