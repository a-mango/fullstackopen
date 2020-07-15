# Notes on part II

## Concepts

### Effect hooks

> The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

See [https://reactjs.org/docs/hooks-effect.html](https://reactjs.org/docs/hooks-effect.html)

### REST

REST is an architecture style used to distribute resources on the internet.

See [https://restfulapi.net](https://restfulapi.net)

### Error handling

In ES6, error handling is done with the `catch()` method which is usually chained with the promises for which it needs to catch errors.

## Tools

### Axios

[Axios](https://github.com/axios/axios) is a promise based HTTP client for the browser and node.js. It allows to place XMLHttpRequests from a browser in a tidy manner. 

### json-server

`json-server` is an npm package that allows to quickly setup and operate a restful server on the developer's machine. Because the default port 3000 is already being used by the react app, the 3001 port is used instead. The command `json-server --port 3001 --watch [file]` runs the json-server on port 3001 serving the specified file. Also, the npm script `"server": "json-server -p 3001 --watch [file]"` is a convenient addition to the `package.json`.

### Debugging

To debug an application that uses asynchronous methods, the developer console and the `console.log()` statements some of the most useful tools. The react developer tools extensions for Firefox and Chrome is also a useful addition to one's developer toolbox.

## Functions

`Array.prototype.some()`
tests whether at least one element in the array passes the test implemented by the provided function. Returns a boolean value.