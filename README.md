# react-redux-server-rendering

Sample code setup for isomorphic rendering with React + Redux + React-router + express. This setup includes everything you need for both development and production deployment.

* Webpack setup for dev environment with hot reloading
* Webpack setup for prod environment with minification and cache busting
* Server side rendering
* Server bunlding excluding node modules (Bundling server.js also, since server rendering imports components written in es6 so babel compilation is requierd for server also)
* React router setup
* Redux setup
* Connecting components and redux store
* Writing component specific css
* Splitting of app code and vendor code
