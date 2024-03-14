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
1. Add scripts to `package.json`.
    ```json
    {
      "scripts": {
        "start": "babel-node ./bin/www",
        "debug": "DEBUG=www:* MODE=development nodemon --delay 2 --exec babel-node ./bin/www",
        "dev": "MODE=development babel-node ./bin/www",
        "stag": "MODE=staging babel-node ./bin/www",
        "prod": "MODE=production babel-node ./bin/www"
      }
    }
    ```

## Running
```zsh
% npm run debug #development & debug mode
% npm run dev #development mode
% npm run stag #staging mode
% npm run prod #production mode
```