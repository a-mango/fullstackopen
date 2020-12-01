# FullStackOpen 2020 by amango

This repository contains my submissions for [Full Stack Open 2020](https://fullstackopen.com/en) by the University of Helsinki. This course is an introduction to modern web app development with React, Redux, Node.js, MongoDB, GraphQL and TypeScript.

## Timeline

Course started on 06.06.2020

| Part  | Date started | Date finished  |
|:-:|:-:|:-:|
| 0 | 06.06.2020 | 07.06.2020 |
| 1 | 10.06.2020 | 18.06.2020 |
| 2 | 22.06.2020 | 15.07.2020 |
| 3 | 30.07.2020 | 29.09.2020 |
| 4 | 01.10.2020 | 18.10.2020 |
| 5 | 18.10.2020 | 23.10.2020 |
| 6 | 23.10.2020 | 12.11.2020 |
| 7 | 12.11.2020 | 25.11.2020 |
| 8 | 26.11.2020 | In progress |

## Useful commands

+ Install create-react-app: `npm i -g create-react-app`
+ Create react app: `npx create-react-app [app-name]`
+ Remove git repo: `rm -rf .git`
+ Reinstall node modules: `rm -rf node_modules/ && npm i`

## Packages

WIP

## Scripts

Here is a list of the npm scripts that have been used throughout the course.

### `"start": "node index.js"`

Starts the index.js script with NodeJS.

### `"dev": "nodemon --inspect index.js"`

Starts the index.js script with *nodemon*.

### `"test": "echo \"Error: no test specified\" && exit 1"`

Default test script.

### `"build:ui": "rm -rf build && cd <source> && npm run build --prod && cp -r build <destination>"`

Build the ReactJS project found in the `<source>` directory and copies the produced build to the `<destination>` directory.

**Warning:** assumes the project to produce a build of has the npm `build` script already setup.

### `"deploy": "git push heroku master"`

Deploys to Heroku.

**Warning:** assumes the git repository of the application has a heroku remote already setup.

### `"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy"`

Runs the `build:ui` script, commits the changes to git then runs the `deploy` script.

### `"logs:prod": "heroku logs --tail"`

Run Heroku's production logs in the terminal.

**Warning:** assumes that *heroku-cli* is installed and configured correctly.

### `"lint": "eslint ."`

Runs eslint in dry mode.

### `"lint:fix": "eslint . --fix"`

Runs eslint and fixes errors.

### `"format:js": "prettier --write '**/*.js'"`

Formats all javascript files in the project using *prettier*.

**Warning:** will also format `build` directory unless specified otherwise in `.prettierignore` file.
