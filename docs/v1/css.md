# Styling Componentes
To add CSS we provide different alternatives.
As component can use Shadow DOM, they aren't loading CSS loaded globally,
so we are managing a system to load specific css files on every component
so that we can have global css files, such as normalize css, bootstrap, etc.

## Global CSS config
We can load css in two ways:
- Telling Jiafei the name of the file to load (defineGlobalCSSFiles)
- Telling Jiafei the CSS in a string (defineGlobalCSS)

### examples
```js
// It can be a string or an array
WebComponent.defineGlobalCSSFiles('bootstrap.min.css')
WebComponent.defineGlobalCSSFiles(['bootstrap.min.css', 'src/global.css'])


import style from './styles.css?inline'
WebComponent.defineGlobalCSS(style)
WebComponent.defineGlobalCSS([style, 'body { margin: 0 }'])
```

## Component config
Inside a component we can also specify a set of css to load on that specific component in the same
two ways as Global CSS config:
1. Telling the component the file (stylesURL) or
2. The css in a string since 1.1.0 (styleCSS)

### examples
We can use stylesURL as a string of an URI to load:
```js
Component({
	tagName: "custom-button",
	stylesURL: "src/components/button-styles.css"
},
class CustomButton extends WebComponent {
	...
})
```
We can also specify multiple URIs
```js
Component({
	tagName: "custom-button",
	stylesURL: ["src/components/button-styles.css", "src/components/other-styles.css"]
},
class CustomButton extends WebComponent {
	...
})
```

```js
Component({
	tagName: "custom-button",
	styleCSS: `
		.btn {
			...
		}
		...
	`
},
class CustomButton extends WebComponent {
	...
})
```

## Full example
```js

Component({
	tagName: "custom-button",
	styleCSS: `
		.my-btn {
			background-color: transparent;
			color: rgb(129, 126, 126);
			border: 1px solid #ABD9D9;
			border-radius: 5px;
			padding: 0.01rem 3rem;
			text-align: left; 
			display: flex;
			padding-left: 1rem;
		}
	`
},
class CustomButton extends WebComponent {
    render() {
        const text = this.innerHTML || "Click me";
        return `<button class="my-btn">${text}</button>`
    }
})

```
