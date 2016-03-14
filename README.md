# react-redux-starter-kit

This is my version of react redux app. This one includes

* Webpack setup for dev environment with hot reloading
* Webpack setup for prod environment with minification and cache busting
* React router setup
* Redux setup
* Connecting components and redux store
* Writing component specific css
* Splitting of app code and vendor code

## Pre-requisites

Basic knowledge on

* React
* Redux
* React-router
* Webpack configurations and loaders


## Getting started

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/davezuko/react-redux-starter-kit.git
$ cd react-redux-starter-kit
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```
## Usage

* To run it in dev mode - `npm start`
* To build the files to run in production environment - `npm run prod-build`
* To run the server in production environment - `npm run prod-run`

## Wanna develop your own app?

Follow these steps,

* Add your route in route.js (Check react-router documentation to see how to map a route and component)
* Add your reducer in reducers folder and handle your actions in it.
* Then add that reducer into `combineReducer` of store.js
* Connect your component mapped in route to redux store using `connect` from react-redux (Check react-redux documentation)

Have fun!!!
