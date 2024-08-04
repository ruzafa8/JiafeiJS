# Jiafei's attributes

## Description
An attribute is a piece of information added to an HTML tag that provides additional details about the element. Attributes are used to configure the behavior, appearance, or functionality of HTML elements.

## Simple usage
Using `getAttribute` function you can access to html attributes. It is always treated as a string.

### example
```js
Component({
	tagName: "app-user",
},
class User extends WebComponent {
  render() {
    const name = this.getAttribute("name")
    const email = this.getAttribute("email")
    return `<div>
      <p>${name}</p>
      <p>${email}</p>
    </div>`
  }
})

Component({
	tagName: "app-home",
},
class Home extends WebComponent {
  init() {
    this.state = {
      userName: "John",
      userEmail: "example@example.com",
    }
  }
  render() {
    return `
      <div>
        <app-user name="${this.state.userName}" email="${this.state.userEmail}"></app-user>
      </div>
    `
  }
})
```

## Property binding 
Since 1.1.0. This feature let us introduce js code as string inside an attribute which will be
evaluated using the class as its context. It is useful when:
1. You want to make a reference to a variable of the class. (Note that, as the context of the evaluation
is the class, you needn't to put the this to make reference to class attributes, properties or functions)
2. To pass a number, array or object, because it will be parsed from string to js type.

To indicate it is a property binding, it must be enclosed between brackets: "[]".

### example
```js
// without property binding
render() {
  return `
    <div>
      <app-user name="${this.state.userName}" email="${this.state.userEmail}"></app-user>
    </div>
  `
}

// with property binding
render() {
  return `
    <div>
      <app-user [name]="state.userName" [email]="state.userEmail"></app-user>
    </div>
  `
}
```

```js
// In this case the custom component User will receive a string in data attribute.
`
  <app-user data="{name: 'John'}"></app-user>
`

// In this case the custom component User will receive an object in data attribute.
`
  <app-user [data]="{name: 'John'}"></app-user>
`
```