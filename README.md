# jEmmit

jEmmit is a tool for quickly creating dom elements using a shorthand methodology based on Emmit and using jQuery.

## To use
jEmmit pattern matches a string that you pass into it to create complex dom elements and returns a jQuery object.

Example of calling jEmmit
```jsx
je("div#id>div+div.className^div")
```

## Dom
To declare a dom element, then you can type the dom type, and jEmmit returns that dom.
```jsx
je("div");
```
returns a jQuery object of a div. 

## Id
To add an Id to a dom, type a # and then name of the id on the dom and it is applied.
```jsx
je("div#ExampleId");
```
returns a jQuery object of a div with the id ExampleId.

## Classes
To add a class to a dom, you type a . and then the name of the class and that class is applied to the dom.
```jsx
je("div#EmapleId.ExampleClass");
```
returns a div with the id ExampleId and the class ExampleClass. 

## Content
Content is added to a dom in a little bit of a different way. Content needs to be surrounded by {}. 
```jsx
je("div#EmapleId.ExampleClass{text found in the div.}");
```
You can do something a little special with content. You can add another jQuery element into the content. Apply the jQuery element to a variable, and then enter ~ before the name of the variable that dom element is applied to. jEmmit will find that variable and will append that jQuery object to the dom element this content is applied to. 
```jsx
je("div#EmapleId.ExampleClass{~VariableWithJqueryElement}");
```

## Children
To create a child dom, you lead with > and enter the dom.
```jsx
je("div#EmapleId.ExampleClass>div.FirstChildClass");
```
This creates a div with a child that has the class FirstChildClass

## Siblings
You can create a sibling dom element with a + and the dom type.  
```jsx
je("div#EmapleId.ExampleClass>div.FirstChildClass+div.SecondChildClass");
```
This returns a div with two children, the first child has a class of FirstChildClass and the second has a class of SecondChildClass.

## Navigating Up the Dom
To move back up the dom tree to add something new there, you can use the ^. Just entering a ^ takes you up 1 dom for each ^ entered. 
```jsx
je("div#EmapleId.ExampleClass>div.FirstChildClass+div.SecondChildClass^>div.ThirdChildClass");
```
This now created a div with three children. It makes the first two using the +, and then you travel up the dom back into the parent div and add another child div.
If you enter text after the ^, then it adds a new dom based off of what you tell it. 
```jsx
$("div>div^div");
```
This would create a div, with two child divs. 

## Cloning
You can clone a dom with the * operator followed by a count of how many times you wish to clone the div. 
```jsx
$("div>div*3");
```
This returns a div with 3 child divs.

## Attributes
Attributes is similar to Content in that you need to surround the Attributes with []. Attributes needs to contain a : as a seperator between the two values of the attribute. The first defines what type of attribute is being applied, and the second is the value being passed into it. 
```jsx
je("div#EmapleId.ExampleClass[data-example: Value For The Data Attribute]");
```

## Event Handlers
Event handlers can be passed into a dom element with an @ followed by the type of event, a colon, and then the name of the function that you want to call. 
```jsx
$("div@click:somefunction");
```
This will return a div that when you click on it will call the function somefuntion(); Be careful about typing the () after the function name as this will prevent it from finding that function.

