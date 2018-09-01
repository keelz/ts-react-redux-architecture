
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
     |    |
     |    |____assets
     |    |    |
     |    |    |____css
     |    |    |    |    index.css
     |    |    |    |
     |    |    |____img
     |    |    |    |    logo.svg
     |    |    |    |
     |    |____constants
     |    |    |    app.ts
     |    |    |
     |    |____models
     |    |    |
     |    |    |
     |    |____redux
     |    |    |
     |    |    |____middleware
     |    |    |
     |    |    |____reducers
     |    |    |
     |    |____utils
     |    |
     |____components
     |    |
     |    |____App
     |    |    |    App.css
     |    |    |    App.test.css
     |    |    |    Index.tsx
     |    |    |
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
  * provides a namespace for organizing string and number literals.
    * string and number literals, oh my! :-1:
    * I smell, code smell! :mask:
    * we can code with in-line string and number literals! :-1:
    * try really hard not to code with number literals! :+1:
    * add string and number literals to constant files! :+1:
    * refer to string and number literals imported from constant files! :+1:
  * provides a namespace for organizing API data models
    * We can model API data in JavaScript? :-1:
    * We can model API data in [TypeScript](https://www.typescriptlang.org/)? :+1:
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

The remaining directories:
```
redux-middleware
|
|____src
     |
     |____components
     |
     |____containers
     |
     |____tests
```
These are all the directories we are going to need to organize our React, Redux, and Test files! They are REQUIRED for all React applications that matter. That's it!

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

__* NOTE *__

Let's stop here and admire what we've accomplished already. With a handfull of very simple cli commands we have done the following:

1. download and configure a base React, TypeScript application!
2. setup our project to implement the most common design patterns and libraries!

You just earned your first :star2:

### Refactoring The Application Code
To get our app running with the new directory structure we will need to modify some import statements.

#### Our project's index file is broken!

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

There is a gotcha. Take a look at line 4. We are importing a css file that was obviously moved and no longer lives at our project root. We should update that as well while we are here.

```javascript
// src/index.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './common/assets/css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```
We changed lines three and four! :star:

__* NOTE *__

Our project root is `src/`. Very important! Don't forget!

#### Our project's App component is borken!

```
redux-middleware/src/components/App
redux-middleware
|
|____src
     |
     |____components
     |    |
     |    |____App
     |    |    |    App.css
     |    |    |    App.test.css
     |    |    |    Index.tsx
     |    |    |
```

Let's fix the index file!

```javascript
// src/components/App/index.tsx
import * as React from 'react';
import './App.css';

import logo from '../../common/assets/img/logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

We changed line 4 (the logo import) to import from the new `common/assets/img` directory. Brilliant!

Next, let's fix our App.test

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

We changed our `App` import statement to import from `./index` instead of `./App` because we moved the old `App.tsx` to `index.tsx` in the previous section.

## MISSION ACCOMPLISHED!

Man, that's a catchy phrase. We should put it on a banner and hang it from an aircraft carrier!

All jokes aside, we did it. At this point I'd take a moment to really appreciate what we have here. Your project probably has a million different requirements and you can probably already start to think about how you might be able to move things around a bit to help you better organize your project's code. That's great! Figure out what works best for you, implement your changes, and refactor often!

For now you can just run the following and admire a spinning React logo!

```
npm run start
npm run test
```
