# Notes on part II

## Concepts

### Effect hooks

> The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

See [https://reactjs.org/docs/hooks-effect.html](https://reactjs.org/docs/hooks-effect.html)

### REST

REST is an architecture style used to distribute resources on the internet.

See [https://restfulapi.net](https://restfulapi.net)

## Tools

`axios` the axios library allows to create sophisticated REST HTTP requests that function with ES6 promises.

`json-server` is an npm package that allows to quickly setup and operate a restful server on the developer's machine. Because the default port 3000 is already being used by the react app, the 3001 port is used instead. The command `json-server --port 3001 --watch [file]` runs the json-server on port 3001 serving the specified file.

## Functions

`Array.prototype.some()`
tests whether at least one element in the array passes the test implemented by the provided function. Returns a boolean value.