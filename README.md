# README.md
Express starting guide for MacOS (M1).

## Preparation
### 1. Using `nvm`
```zsh
% brew install nvm #Homebrew installation
% nvm list #show list of installed nodes
% nvm install [VERSION] #install certain version of node
% nvm use v[VERSION] #temporarily use certain version of node
% nvm alias default v[VERSION] #permanently use certain version of node
```

## Installation
### 1. Using `express-generator`
```zsh
% npm i -g express-generator #install express template generator
% express -h #shows template guide for express
```

## Initializing
### 1. Generating new project
```zsh
% express --no-view --git [APPNAME] #generate backend server
% express --ejs --view=ejs --git [APPNAME] #generate full-stack server (with ejs)
% cd [APPNAME] && npm i && git init #install
```
### 2. Easy start
1. Install `nodemon`.
    ```zsh
    % npm i -D nodemon #add dev dependencies
    ```
1. Add `ES6` compatibility
    ```zsh
    % npm i -D @babel/core @babel/cli @babel/node @babel/preset-env babel-loader
    ```
1. Add scripts to `package.json`.
    ```json
    {
      "scripts": {
        "start": "babel-node ./bin/www",
        "debug": "DEBUG=www:* MODE=development nodemon --delay 2 --exec babel-node ./bin/www",
        "dev": "MODE=development babel-node ./bin/www",
        "stag": "MODE=staging babel-node ./bin/www",
        "prod": "MODE=production babel-node ./bin/www"
      },
      "babel": {
        "presets": [
          "@babel/preset-env"
        ]
      }
    }
    ```
1. Add `MODE`, `DEBUG` to `app.js`.
    ```js
    const { MODE, DEBUG } = process.env;
    
    if (MODE === 'development') app.use(logger('dev'));
    ```

## Running
```zsh
% npm run debug #development & debug mode
% npm run dev #development mode
% npm run stag #staging mode
% npm run prod #production mode
```

## Post Installation
### 1. Useful Packages
1. Production
    * Error collection: `express-async-errors`, `http-errors`
    * File upload middleware: `multer`, `multer-s3`, `@aws-sdk/slient-s3`
    * Database: `mysql2`
1. Development
    * Documentation: `swagger-ui-express`, `swagger-jsdoc`

### 2. Code Modification
1. Change `require` to `import`
    ```js
    // before
    var express = require('express');
    // after
    import express from 'express';
    ```
1. Change `function` to `async ()=>`
    ```js
    // before
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
    // after
    router.get('/', async (req, res, next)=> {
      res.render('index', { title: 'Express' });
    });
    ```
1. Add error handler
    ```js
    import createError from 'http-errors';
    import 'express-async-errors';

    app.use(async (err, req, res, next)=> {
      // development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // production
      if (!DEBUG) {
        console.log(err);
        if (MODE === 'production') {
          // your code
        };
      };
      res.sendStatus(err.status || 500);
    });
    ```