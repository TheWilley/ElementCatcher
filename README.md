# ElementCatcher
Access child elements using object syntax.

The overall goal is to reduce the amount of `getElementById()` calls in a document and instead access elements in a object using the element id as the object key.

## Setup
Firstly, load *ElementCatcher* in your html file using an import statement:
```javascript
import {ElementCatcher} from 'elementCatcher.js'
```
Then, create a new instance with `new ElementCatcher()` in your script. The instance should be created at the end of the html as it otherwise won't find any elements.

## Options

| Key             | Type                                | Required | Description                                                                                                                                                                                                                                                                                                                 |
| --------------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div align="center"> targetElement </div>              | Element                              | yes      | The *target element*. By default, all children of this element with be catched.                                                                                                                                                                                                                                |
| <div align="center"> getElementsWith </div>  | string (id, class, all, allAsArray) | yes      | Filter elements by type. <li> The `id` option will return all elements with an id as an object key<li> The `class` option will return all elements with a class as an array <li>The `all` option will return all elements as either an id or class array  <li> The `allAsArray` option will return all elements as an array |
| <div align="center"> ignoreClass </div>      | string                              | no       | Only elements **without**   this class name will be added.                                                                                                                                                                                                                                                                   |
| <div align="center"> includeClass </div>      | string                              | no       | Only elements **with** this class name will be added.                                                                                                                                                                                                                                                                        |
| <div align="center"> directChildren </div>    | bool                                | no       | If you only want the direct children of your target element to be added, set this to true. By default, all elements (including "grand children") will be catched.                                                                                                                                                           |


The *target element* will be catched by default.

### Example 
```javascript
new ElementCatcher({
    targetElement: document.getElementById("some_id"),
    getElementWith: "id",
    includeClass: "some-class"
})
```

**Note that there cannot be both a `ìgnoreClass` and `includeClass` option in the same instance**

## Accessing elements / getElementsWith
You can access elements by directly using the object or its array variable `elements`. These are the values accepted by the `getElementsWith` key.

<table>
    <thead>
    <th>Value</th>
<th>Description</th>
    </thead>

<tbody>
<tr>
<td align="center">id</td>
<td>
Lets say I have the following instance:
    
```javascript
var catcher = new ElementCatcher({
    targetElement: document.getElementById("some_id"),
    getElementsWith: "id",
})
```
    
and this html:
```html
<div id="some_id">
    <span id="some_span">
</div>
```

I could then access the child element with:
```javascript
catcher.some_span
```

Therfore:
```javascript
document.getElementById("some_span") = catcher.someSpan
```
</td>
</tr>
<tr>
<td align="center">class</td>
<td>
This option is useful if you want to iterate trough class elements, but generally not useful to get a specific element as the array is dynamic. 

Lets say I have the following instance:
```javascript
var catcher = new ElementCatcher({
    targetElement: document.getElementById("some_id"),
    getElementsWith: "class",
    includeClass: "some-class"
})
```

and this html:
```html
<div id="some_id">
    <span class="some-class">
</div>
```

I could then access the element with:
```javascript
catcher.elements[0]
```
    
</td>
</tr>
<tr>
    <td align="center">all</td>
    <td>
This option will automatically add an element as a object key if it has an id or add it to the elements  array if it does not. 

Lets say I have the following instance:
```javascript
var catcher = new ElementCatcher({
    targetElement: document.getElementById("some_id"),
    getElementsWith: "all",
    includeClass: "some-class"
})
```

and this html:
```html
<div id="some_id">
    <span id="some_other_id" class="some-class">
    <span class="some-class">
</div>
```

I could then access the first span element with:
```javascript
catcher.some_other_id
```
and the second span element with:
```javascript
catcher.elements[0]
```

The reason is that if an id exist, it will always be added as a key, not in the `elements` array.
    </td>
</tr>
<tr>
<td align="center">allAsArray</td>
<td>
This option will add all elements to the `elements` array, even if it has an id.

Lets say I have the following instance:
```javascript
var catcher = new ElementCatcher({
    targetElement: document.getElementById("some_id"),
    getElementsWith: "allAsArray",
})
```

and this html:
```html
<div id="some_id">
    <span id="some_other_id" class="some-class">
    <span class="some-class">
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
</td>
</tr>
</tbody>
</table>



## Errors
<table>
<thead>
<th>Error</th>
<th>Explanation</th>
<th>Fix</th>
</thead>
<tbody>
<tr>
<td> <i> No object found </i></td>
<td> The ElementCatcher instance is missing an object </td>
<td>
Add an object as a argument: 

```javascript
new ElementCatcher({}) 
```
</td>
</tr>
<tr>
<td> <i> ignoreClass and includeClass cannot exist in the same instance </i></td>
<td> Both keys exist in the same object </td>
<td>
Remove one key:

```javascript
new ElementCatcher({
    ignoreClass: "some_class", // Remove this line...
    includeClass: "some_class" // or this line
})
```
</td>
</tr>
</tr>
<tr>
<td> <i> No 'targetElement' value found
 </i></td>
<td> An element was expected as input, but none was found </td>
<td>
Add an id:

```javascript
new ElementCatcher({
    targetElement: document.getElementById("some_id") // Add this line
})
```
</td>
</tr>
<tr> 
<td> <i> targetElement does not exist </i> </td>
<td> The target idelement could not be found </td>
<td> Control that the given element exist:

```javascript
new ElementCatcher({
    targetElement: document.getElementById("some_id") // Check if the element exist
})
```
</td>
</tr>
</tbody>
</table>

## Functions
| Name         | Accepts         | Description                                                 |
| ------------ | --------------- | ----------------------------------------------------------- |
| addElement() | element / array | Add one or multiple elements to the ElementCatcher instance |


## Help
For help and or questions, please create an issue.
