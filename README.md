
# React TypeScript Architecture

This software repository is a [several part series](https://github.com/keelz/ts-react-redux-architecture). Each branch of this repository provides specific information, code examples, thoughts, and notes regarding the implementations of different libraries and design patterns common within the [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/) development community.

My motivation for developing this repository originates from a growing community outcry for more. There are countless walkthroughs, blogs, and tutorials showcasing these technologies. What is missing within that endless swirl of information is a repository of information that dives into the deeper concepts of implementations using real-world type examples as source material. My goal is to fill that gap.

After developing several production apps with [TypeScript](https://www.typescriptlang.org/) and the [React](https://reactjs.org/) framework library, I decided to organize my personal notes and experiences into a slightly opinionated library of applications. I will try very hard not to focus too hard on my own opinions, however, many of the design patterns that I will describe within this series are born from opinions of good software development. I humbly ask for your understanding and collaboration!

## Repository Index

* [Master Branch](https://github.com/keelz/ts-react-redux-architecture)<br />
_install, bootstrap, and configure_

## Branch Index

* [1.0 Description](#1.0-description)
* [1.1 Bootstrap From CLI](#1.1-bootstrap-from-cli)
* [1.2 Refactor The Project Directory Structure](#1.2-refactor-the-project-directory-structure)
* [1.3 Refactor The Application Source Code](#1.3-refactor-the-application-source-code)
* [Mission Accomplished](#mission-accomplished)

## 1.0 Description

We start at the beginning... because it's the most logical place to start.

### Problem

We need to create a new [Single Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) with the following acceptance criteria:

1. [TypeScript](https://www.typescriptlang.org/) will be the development language for the client application.
2. [React](https://reactjs.org) will be the framework library for the client application.
3. [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/docs/api/) will provide the test framework for the client application.
4. The project will be ready to support [Redux](https://redux.js.org/) state management library integration.
5. The project will be ready to support future integrations with both internal and external API resources.
6. The project will provide an environment optimal for code reuse, testing, and deployment.

### Solution

1. Install [Nodejs](https://nodejs.org/en/)
2. Bootstrap a new client application using [Create React App](https://github.com/facebook/create-react-app) with the [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript) script.
3. Refactor the project directory structure to meet acceptance criteria.
4. Refactor the source code to meet acceptance criteria.
5. Test our project to ensure that it is in a workable state and meets all acceptance critera.

### Development Environment Requirements

* [nodejs](https://nodejs.org/en/)
* [A modern IDE](https://code.visualstudio.com/) and [linting utility](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

## 1.1 Bootstrap From CLI

_assuming you already installed nodejs..._

Open your favorite terminal, make your way to a familiar workspace such as ```~/Projects```, and type the following command:

`npx create-react-app ts-react-redux-architecture --scripts-version=react-scripts-ts`

> __* OPINION *__
>
> Create React App offers us irreplaceable utility. Once upon a time we (JavaScript Engineers) spent hours, days, and sometimes weeks setting up and bootstrapping our apps. We used nomenclature like "tooling" to describe the seemlessly endless nightmare of preparing our apps to work with the latest distributions of JavaScript and organize our source code, and the new words made us feel better about the nightmare. Today, we can lean on utilities to reduce the "fatigue" of preparation down to seconds. With a simple cli command we can request the framework we want and watch as the base application is configured for us. This can't be a bad thing!

## 1.2 Refactor the Project Directory Structure

After our app finishes bootstrapping we need to configure our app to prepare for future technology implementations. Create React App installs it's base application in an unopinionated manner. As such it leaves us with a `src/` directory that has no organization. We need to remedy this!

In a terminal, from within the new project directory...

```
mkdir -p src/common/assets/css src/common/assets/img
mv src/index.css src/common/assets/css/
mv src/logo.svg src/common/assets/img/
mkdir -p src/common/constants
touch src/common/constants/app.ts
touch src/common/constants/api.ts
mkdir -p src/common/models
touch src/common/models/index.ts
mkdir -p src/common/redux/middleware src/common/redux/reducers
touch src/common/redux/store.ts
touch src/common/redux/middleware/index.ts
touch src/common/redux/reducers/index.ts
mkdir -p src/common/utils
touch src/common/utils/index.ts
mkdir -p src/components/App
mv src/App.tsx src/components/App/index.tsx
mv src/App.css src/components/App/App.css
mkdir -p src/containers/App
touch src/containers/App/index.ts
mkdir -p src/tests/App
mv src/App.test.tsx src/tests/App/index.test.tsx
```

> __* NOTE *__
>
> * Our project's source code root directory is `ts-react-redux-architecture/src/`. Very important! Don't forget!
> * These articles will refer to our source code root directory as `src/` moving forward.

### Refactored Project Directory Structure
```
ts-react-redux-architecture
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
     |    |    |    api.ts
     |    |    |
     |    |____models
     |    |    |    index.ts
     |    |    |
     |    |____redux
     |    |    |
     |    |    |____middleware
     |    |    |    |    index.ts
     |    |    |    |
     |    |    |____reducers
     |    |    |    |    index.ts
     |    |    |    |
     |    |____utils
     |    |    |    index.ts
     |    |    |
     |____components
     |    |
     |    |____App
     |    |    |    App.css
     |    |    |    App.test.tsx
     |    |    |    Index.tsx
     |    |    |
     |____containers
     |    |
     |    |____App
     |    |    |    index.ts
     |    |    |
     |____tests
     |    |
     |    |____App
     |    |    |    index.ts
     |    |    |
```

> __* OPINION *__
>
> Okay, so regarding directory structure. My first piece of advice when starting any React application is that you "should" start your project with a structure either exactly like or very close to the structure shown here. If you are able to either start with or re-factor to a structure like the one shown here you will save yourself a lot of frustration later on in project development. Organization and architecture are key fundamental principals of our craft as software engineers and we should spend a significant amount of time applying them!
> 
> Here are my smelly bananas...
> 
> * common directory
>   * provides a namespace for all of our assets! :relieved:
>     * css
>     * scss
>     * images
>     * files
>     * and stuff!
>   * provides a namespace for organizing string and number literals.
>     * string and number literals, oh my! :-1:
>     * I smell, code smell! :mask:
>     * we can code with in-line string and number literals! :-1:
>     * try really hard not to code with number literals! :+1:
>     * add string and number literals to constant files! :+1:
>     * refer to string and number literals imported from constant files! :+1:
>   * provides a namespace for organizing API data models
>     * We can model API data in JavaScript? :-1:
>     * We can model API data in [TypeScript](https://www.typescriptlang.org/)? :+1:
>     * Wait, what? We can model API request and response data? :+1:
>   * provides a namespace for organizing redux design patters
>     * types & interfaces
>     * middleware
>     * reducers
>     * actions
>     * dispatchers
>     * state models
>   * provides a namespace for organizing external utilities and helper methods
>     * we can write helper methods directly into our component files! :anguished:
>     * but what about containers? :grimacing:
>     * I know we can write them in reducers! :cold_sweat:
>     * middleware...? :scream:
>
> The remaining directories:
>
> ```
> ts-react-redux-architecture
> |
> |____src
>      |
>      |____components
>      |
>      |____containers
>      |
>      |____tests
> ```
>
> These are all the directories we are going to need to organize our React, Redux, and Test files! They are REQUIRED for all React applications that matter. That's it!

## 1.3 Refactor The Application Source Code

Our app is broken! Well, yes... we broke everything when we refactored our app's directory structure and now we need to refactor the source code to include those changes. Let's fix it!

### Our project's index file is broken!

```
ts-react-redux-architecture/src/index.tsx
ts-react-redux-architecture
|
|____src
     |    index.tsx

```

When we open the file we should see, dpending on our flavor of [IDE and linting tools](https://marketplace.visualstudio.com/items?itemName=eg2.tslint), that the `import` statement on line 3 is linted with an error. The linting error is telling us that the IDE can no longer locate the file we are attempting to import (App.tsx). To resolve this issue we'll need to import the appropriate file (src/components/App/index.tsx) that we moved and renamed in the [Refactoring The Application Structure](#refactoring-the-application-structure).

When we restructured our application we moved the `src/App.tsx` file to `src/components/App/index.tsx`. To resolve the linting error we will need to provide the import statement with the virtual path to the new file.

> __* NOTE *__
>
> There is a gotcha here. Take a look at the line of your untouched source code that is importing the index css file. We are importing a css file that was obviously moved and no longer lives at our project root. We should update that as well while we are here. The gotcha here is that your linter may not catch that the import statement is actually wrong.

```typescript
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

> __* NOTE *__
>
> Our project root is `src/`. Very important! Don't forget!

### Our project's App component is borken!

```
ts-react-redux-architecture/src/components/App
ts-react-redux-architecture
|
|____src
     |
     |____components
     |    |
     |    |____App
     |    |    |    App.css
     |    |    |    Index.tsx
     |    |    |
```

Let's fix the index file!

```typescript
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

> __* OPINION *__
>
> Bootstrapping our app with Create React App provides us a little utility with import statements. That utitlity comes in the form of a path alias to our application source code root. The effect of the utility allows us to use import like such:
>
> ```import logo from 'common/assets/img/logo.svg```
>
> I personally don't like aliased import paths for several reasons. First, they make third party integrations such as enzyme and jest a bit more challenging to setup, and second they assume too much. I like my import statements to be specific and as such I will always use relative paths with my import statements. Also, I won't dive into configuring 3rd party implementations to work with aliases. I feel like the relative paths (although longer) buy us clarity while reducing 3rd party implemenation requirements (win win)!

Next, let's fix our app's only test file. We moved and renamed `src/App.test.tsx` to `src/tests/App/index.test.tsx` and in doing so we ended up breaking the import statement that's importing the App component. Let's fix it.

```typescript
// src/tests/App/index.test.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../../components/App/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

## MISSION ACCOMPLISHED!

![mission accomplished](https://varchitectthoughts.files.wordpress.com/2016/03/mission_accomplished_baby.jpg)

Man, that's a catchy phrase. We should put it on a banner and hang it from an aircraft carrier!

All jokes aside, we did it. At this point I'd take a moment to really appreciate what we have here. Your project probably has a million different requirements and you can probably already start to think about how you might be able to move things around a bit to help you better organize your project's code. That's great! Figure out what works best for you, implement your changes, and refactor often!

For now you can just run the following to admire pretty tables and a spinning React logo!

Test our project:
```
npm run test -- --coverage

---------------------------|----------|----------|----------|----------|-------------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------------|----------|----------|----------|----------|-------------------|
All files                  |       18 |        0 |    11.76 |    16.33 |                   |
 src                       |        0 |        0 |        0 |        0 |                   |
  index.tsx                |        0 |      100 |      100 |        0 |    1,2,3,4,5,7,11 |
  registerServiceWorker.ts |        0 |        0 |        0 |        0 |... 17,118,119,120 |
 src/components/App        |      100 |      100 |      100 |      100 |                   |
  index.tsx                |      100 |      100 |      100 |      100 |                   |
---------------------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.649s
Ran all test suites.
```

Start our project:
```
npm run start
```

Build our project:
```
npm run build
```
