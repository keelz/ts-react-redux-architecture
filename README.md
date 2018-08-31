
# React TypeScript Architecture

This application is a slightly modified out-of-the-box example of a web client application [SPA](https://en.wikipedia.org/wiki/Single-page_application) bootstrapped with [Create React App](https://github.com/facebookincubator/create-react/app) and the [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript) script.

The following example code represents a [TypeScript](https://www.typescriptlang.org/) application developed with the [React](https://reactjs.org/) framework library. The project showcases a few simple steps that can be made to modify the application to prepare for common design pattern and library implementations including:
* [Redux](https://redux.js.org/)
* [redux-thunk](https://github.com/reduxjs/redux-thunk)
* [React Router](https://reacttraining.com/react-router/core/guides/philosophy)

## Requirements
[nodejs](https://nodejs.org/en/)

## Bootstrap From CLI
`npx create-react-app redux-middleware --scripts-version=react-scripts-ts`

## Create The Application Directory Structure
The following represents the finished state of our application directory (src) structure after creating
new directories and moving files. The only additional file created during the refactor process is
`src/common/constants/app.ts` and this was accomplished with a simple `touch` cli command.

### Finished Application Structure
```
redux-middleware
|
|____src
     |    index.tsx
     |    registerServiceWorker.ts
     |
     |____common
     |    |____assets
     |    |    |____css
     |    |    |        index.css
     |    |    |
     |    |    |____img
     |    |    |        logo.svg
     |    |    |
     |    |____constants
     |    |    |    app.ts
     |    |    |
     |    |____models
     |    |    |
     |    |____redux
     |    |    |____middleware
     |    |    |
     |    |    |____reducers
     |    |
     |    |____utils
     |    |
     |____components
     |
     |____containers
     |
     |____tests
```

__* OPINION *__

Whoa! My first opinion in this series! Moving forward, if you see an opinion tag it means I'm going to offer my own "opinion" on a particular subject. You've been warned.

Okay, so regarding directory structure. My first piece of advice when starting any React application is that you "should" start your project with a structure either exactly like or very close to the structure shown here. If you are able to either start with or re-factor to a structure like the one shown here you will save yourself a lot of frustration later on in project development. Organization and architecture are key fundamental principals of our craft as software engineers and we should spend a significant amount of time applying them!

Here are my pros and cons...

* common directory
  * provides a namespace for all of our assets! :relieved:
    * css
    * scss
    * images
    * files
    * and stuff!
  * provides a namespace for organizing string and number constants.
    * string and number literals, oh my! :-1:
    * I smell, code smell! :-1:
    * we can code with in-line string and number literals! :-1:
    * try really hard not to code with number literals! :+1:
    * add string and number literals to constant files! :+1:
    * refer to string and number literals imported from constant files! :+1:
  * provides a namespace for organizing data models for API implementations
    * We can model API data in JavaScript? :-1:
    * We can model API data in TypeScript? :+1:
    * Wait, what? We can model API request and response data? :+1:
  * provides a namespace for organizing redux design patters
    * types & interfaces
    * middleware
    * reducers
    * actions
    * dispatchers
    * state models
  * provides a namespace for organizing external utilities and helper methods
    * we can write helper methods directly into our component files! :anguished:
    * but what about containers? :grimacing:
    * I know we can write them in reducers! :cold_sweat:
    * middleware...? :scream:

### Refactoring The Application Structure
To produce our app's directory structure we simply create the new architectural sub-directories, move/rename files, and
touch the single constants file we will need to start developing our app. The full command list to accomplish the changes we are looking for is listed below.

```
cd redux-middleware/src
mkdir -p common/assets/css common/assets/img
mv index.css common/assets/css
mv logo.svg common/assets/img
mkdir common/constants
touch common/constants/app.ts
mkdir -p common/redux/middleware common/redux/reducers
mkdir common/models common/utils
mkdir -p components/App
mv App.* components/App
mv components/App/App.tsx components/App/index.tsx
mkdir containers tests
```

### Refactoring The Application Code
To get our app running with the new directory structure we will need to modify some import statements.

First, let's take a look at our application starting point.
```
redux-middleware/src/index.tsx
redux-middleware
|
|____src
     |    index.tsx

```

When we open the file we should see, dpending on our flavor of [IDE and linting tools](https://marketplace.visualstudio.com/items?itemName=eg2.tslint), that the `import` statement on line 3 is linted with an error. The linting error is telling us that the IDE can no longer locate the file we are attempting to import (App.tsx). To resolve this issue we'll need to import the appropriate file (src/components/App/index.tsx) that we moved and renamed in the [Refactoring The Application Structure](#refactoring-the-application-structure).

When we restructured our application we moved the `src/App.tsx` file to `src/components/App/index.tsx`. To resolve the linting error we will need to provide the import statement with the virtual path to the new file.

__* NOTE *__

Whoa! Our first note! Moving forward if you see the note tag then it means I'm trying to call your attention to something!

Our application's project root is `/src`.

^ that was the note.

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```
