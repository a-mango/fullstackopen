# 📞 Phonebook Backend

## Introduction

In this section we will learn to implement server-side functionnalities with node.js. The goal of the course is to code a backend that will work with the phonebook application from part 2. For the sake of simplicity (or not...), the phonebook application is written and refactored in this repository and then copied to [it's own repo on github](https://github.com/a-mango/phonebook) before being deployed to Heroku.

## Software

**Node.js** is a server-side javascript engine which can be used to provide dynamically generated content to the user on the client-side.
**Express** is a javascript library that is used to create web servers. It allows the easy creation of, for instance, a RESTful API.
**Nodemon** is an utility packages that monitors a node.js application for changes and automatically restarts the app if needed.
**REST client** is a VSCode extension that allows to run requests from the IDE.

## Scripts

The following script are available :

## Exercise steps

1. Create a new application with `npm init && touch index.js`
2. Add required dependencies with `npm add express` and `npm add --dev nodemon`
3. Edit package.json to add following scripts:
`
  "start": "node index.js",
  "dev": "nodemon index.js",
`
4. Edit index.js:
  - Use express with CommonJS `require`
  - Create the routes