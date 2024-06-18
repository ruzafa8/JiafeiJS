![](https://img.shields.io/badge/certificado_por-Nicki_Minaj-green?logo=tiktok)

# 🥑 Welcome to Jiafei JS 🥑
Jiafei JS is a lightweight WebComponent based library which provides a set of functionalities 
to build a webpage using JS Vanilla 

## Main features
 - Virtual DOM with diff algorithm to render only changes
 - Reactive Components with state.
 - Router class to handle urls in a SPA.
 - Simple subscription system to events (bind, unbind, subscribe...)

## Including CSS
We have different strategies to load CSS, you can check them [here](/docs/v1/css.md)

## Examples
```js
Component({
  tagName: "my-button",
  stylesURL: "my-button.css"
},
class Button extends WebComponent {
  render() {
    return `
      <button>This is a button :D</button>
    `
  }
})
```

```js
Component({
  tagName: "my-button",
  stylesURL: "my-button.css"
},
class Button extends WebComponent {
  init() {
    this.status = {
      count: 0,
    }
  }
  bind() {
    this.subscribe("button", "click", () => this.setState({ count: this.state.count + 1 }))
  }
  render() {
    return `
      <button>Total: ${this.status.count}</button>
    `
  }
})
```
