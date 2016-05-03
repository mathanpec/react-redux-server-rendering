# react-redux-server-rendering

Sample code setup for server side rendering with React + Redux + React-router + express. This setup includes everything you need for both development and production deployment.

* Webpack setup for dev environment with hot reloading
* Webpack setup for prod environment with minification and cache busting
* Server side rendering
* Server bunlding excluding node modules (Bundling server.js also, since server rendering imports components written in es6 so babel compilation is requierd for server also)
* React router setup
* Redux setup
* Connecting components and redux store
* Writing component specific css
* Splitting of app code and vendor code

## Getting started

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/mathanpec/react-redux-server-rendering.git
$ cd react-redux-server-rendering
$ npm install                   
```
Above step will install all the necessary modules mentioned in `package.json`. Usually we bundle only the client side assets, but here we do server side rendering and we need to bundle the server (server.js) code also. This is required because we import React components written in es6, jsx in our server.js and node can't just understand them. So we have `server.webpack.js` which takes care of compiling the server.js using babel and other loaders and finally creates a bundle out of it.

## For DEV environment

* Execute `npm run dev-server` to build server bundle which will actually create `server-bundle.js` and this creates new bundle on every change to server code.
* Then do `npm run dev-start` in another terminal window to start the server using the created bundle. If you want restart the server on every new bundle creation, you can use `nodemon server-bundle.js` to start the server.

## For running in Production mode

* First do `npm run prod-server` to build server bundle.
* Next is to execute `npm run prod-build` which will build the client side assets.
* Now you have all the code ready to run in production mode. Now you can move the app to the server with NodeJS environment 
* Then finally doing `npm run prod-run` will kick start your app in production mode.

PS: Refer package.json for all the `npm run` commands
