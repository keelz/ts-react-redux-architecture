
# TypeScript, React, Redux... Architecture

This software repository is a [several part series](https://github.com/keelz/ts-react-redux-architecture). Each branch of this repository provides specific information, code examples, thoughts, and notes regarding the implementations of different libraries and design patterns common within the [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/) development community.

My motivation for developing this repository originates from a growing community outcry for more. There are countless walkthroughs, blogs, and tutorials showcasing these technologies. What is missing within that endless swirl of information is a repository of information that dives into the deeper concepts of implementations using real-world type examples as source material. My goal is to fill that gap.

After developing several production apps with [TypeScript](https://www.typescriptlang.org/) and the [React](https://reactjs.org/) framework library, I decided to organize my personal notes and experiences into a slightly opinionated library of applications. I will try very hard not to focus too hard on my own opinions, however, many of the design patterns that I will describe within this series are born from opinions of good software development. I humbly ask for your understanding and collaboration!

## Repository Index

* [Master Branch](https://github.com/keelz/ts-react-redux-architecture#react-typescript-architecture)<br />
_install, bootstrap, and configure_

* [Environment Setup](https://github.com/keelz/ts-react-redux-architecture/tree/1.0.1-environment-setup#environment-setup)<br />
_development environment setup_

* [Bootstrapping Redux](https://github.com/keelz/ts-react-redux-architecture/tree/1.0.2-bootstrapping-redux#bootstrapping-redux)<br />
_install, configure, and test a redux implmentation_

## Branch Index

* [1.0 Description](#environment-setup)
* [1.1 Package Configuration](#package-configuration)
* [1.2 TSLint Configuration](#tslint-configuration)
* [1.3 Enzyme Install & Config](#enzyme-install-&-config)
* [FINISHED](#finished)

## Environment Setup

It's good to keep things organized and our environment should work for us not against us. On this branch we are going to make some small changes to our tools that will help us stay organized and use best practices while building a React application.

### Problem

We need to setup our development environment to help us stay organized and use best coding practices.

1. [TypeScript](https://www.typescriptlang.org/) will be the development language for the client application.
2. [React](https://reactjs.org) will be the framework library for the client application.
3. [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/docs/api/) will provide the test framework for the client application.
4. The project will be ready to support [Redux](https://redux.js.org/) state management library integration.
5. The project will be ready to support future integrations with both internal and external API resources.
6. The project will provide an environment optimal for code reuse, testing, and deployment.

### Solution

1. Configure our Project package.json
2. Configure [TSLint](https://palantir.github.io/tslint/)
3. Install and configure [Enzyme](https://airbnb.io/enzyme/docs/api/)

### Development Environment Requirements

* [nodejs](https://nodejs.org/en/)
* [A modern IDE](https://code.visualstudio.com/) and [linting utility](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

## Package Configuration

Okay, let's organize our `package.json` file. The file is located and the Project root.

### Scripts, Scripts, Scripts

A default out of the box create-react-app installation will typically provide a `package.json` file that looks similar to this:
```json
{
  "name": "redux-middleware",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts-ts": "2.17.0"
  },
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"
  },
  "devDependencies": {
    "@types/jest": "^23.3.1",
    "@types/node": "^10.9.4",
    "@types/react": "^16.4.13",
    "@types/react-dom": "^16.0.7",
    "typescript": "^3.0.3"
  }
}
```

One of the first things we should do is give our `package.json` file a little attention. The `scripts` section of the file is where the meat and potatos live for helping us tool our project so I like to move it to the top, just under the `name, version, private` properties, like so:

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "react-scripts-ts build",
    "coverage": "react-scripts-ts test --env=jsdom --coverage",
    "eject": "react-scripts-ts eject",
    "start": "react-scripts-ts start",
    "test": "react-scripts-ts test --env=jsdom"
  },
```

You'll notice that we also added a `coverage` script. The `coverage` script addition allows us to easily get test coverage information from our project by initiating a script separate from the `test` script. We add a new script here opposed to modifying the `test` script directly so that we can reserve either test script for a [CI/CD Pipeline](https://aws.amazon.com/getting-started/projects/set-up-ci-cd-pipeline/).

We'll come back to the coverage script in a moment as there some other things we should configure before using it, but if you absolutely can't wait then go ahead and save the file now and give it a try:

```
npm run coverage
```

### Jest

Our package json is pretty basic and doesn't offer us any jest configurations. While this is workable, it's not ideal for a good setup in my opinion. Let's fix it.

At the parent level of our `package.json` file, just below the `scripts` node, go ahead and add the following:
```json
  "jest": {
    "collectCoverageFrom": [
      "src/common/constants/**/*.{ts,tsx}",
      "src/common/models/**/*.{ts,tsx}",
      "src/common/redux/middleware/**/*.{ts,tsx}",
      "src/common/redux/reducers/**/*.{ts,tsx}",
      "src/common/utils/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "src/containers/**/*.{ts,tsx}"
    ],
    "coverageReporters": [
      "cobertura",
      "text-summary"
    ]
  },
```

A create-react-app installation doesn't allow us to make very many changes to the default configuration for Jest, however, the few options that you can change are pretty powerful in their own right.

The first option we added is `collectCoverageForm`. Out of the box Jest is configured to scan your project's files, functions, and lines to compare them to test files for coverage reports. In a react app we typically want to have a little more control over what we test and how we generate our coverage reports. Here we tell Jest that we only want to gather coverage reports from an exclusive list of file names and directories.

The second option we added is `coverageReporters`. Out of the box Jest is configured to produce a rather ugly and cryptic coverage report in my opinion. Adding `covertura` and `text-summary` options to the coverage reports produces a nice clean report that looks like so:

```
$: npm run coverage

=============================== Coverage summary ===============================
Statements   : 100% ( 9/9 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 2/2 )
Lines        : 100% ( 8/8 )
================================================================================
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        10.114s
Ran all test suites.
```

> __*OPINION*__
>
> As a general rule of thumb you should strive for 100% coverage of react components while also covering helper functions, utilities, and all redux files.
>
> __*NOTE*__
>
> A create-react-app installation will allow you to adjust the following Jest configurations without ejecting. To make these option changes you'll need to add them to the `jest` node of your `package.json` file.
>
> * collectCoverageFrom
> * coverageReporters
> * coverageThreshold
> * snapshotSerializers
> * moduleNameMapper
>
> All other Jest configuration will require that the app be ejected before they can be applied.

That's it! Our `package.json` file should now look similar to this:

```json
{
  "name": "redux-middleware",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "react-scripts-ts build",
    "coverage": "react-scripts-ts test --env=jsdom --coverage",
    "eject": "react-scripts-ts eject",
    "start": "react-scripts-ts start",
    "test": "react-scripts-ts test --env=jsdom"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/common/constants/**/*.{ts,tsx}",
      "src/common/models/**/*.{ts,tsx}",
      "src/common/redux/middleware/**/*.{ts,tsx}",
      "src/common/redux/reducers/**/*.{ts,tsx}",
      "src/common/utils/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "src/containers/**/*.{ts,tsx}"
    ],
    "coverageReporters": [
      "cobertura",
      "text-summary"
    ]
  },
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts-ts": "2.17.0"
  },
  "devDependencies": {
    "@types/jest": "^23.3.1",
    "@types/node": "^10.9.4",
    "@types/react": "^16.4.13",
    "@types/react-dom": "^16.0.7",
    "typescript": "^3.0.3"
  }
}
```

## TSLint Configuration

Okay, now that we have our `package.json` file setup, let's take a look at our `tslint.json` and `tsconfig.json` files. Arguably, our most powerful tool while developing a React application with TypeScript is [TSLint](https://palantir.github.io/tslint/). Unfortunately, a default setup with `create-react-app` doesn't offer us a lot of utility in the way of best coding practices. Let's fix it!

### tslint.json

Okay, let's go grab a really good starting point. Personally, I've been working with airbnb linting rules for a while and I enjoy them. Let's install the airbnb package for tslint.

```
$: npm install -D tslint-config-airbnb
```

Great! Now we have to tell tslint to use our new configuration. Open the `tslint.json` file and make the following changes:

```json
{
  "extends": ["tslint-config-airbnb"],
  "rules": {
    "import-name": false,
    "ordered-imports": false,
    "semicolon": [true, "always"],
    "ter-arrow-parens": false,
    "trailing-comma": [
      true,
      {
        "multiline": {
          "arrays": "always",
          "objects": "always",
          "functions": "never",
          "typeLiterals": "ignore"
        }
      }
    ]
  },
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```

1. We changed the `extends` value to `["tslint-config-airbnb"]`
2. We added a `rules` property under the `extends` property.

> __*NOTE*__
>
> You can read more about tslint configuration rules [here](https://palantir.github.io/tslint/rules/). The rules that I have set here make development tight while allowing for some sanity flexibility. I definitely recommend reading up on each rule to see what it actually does and it wouldn't hurt to consume the entire rule set to see if there are any you prefer.

### tsconfig.json

Okay, we need to setup our project to use Enzyme and in preparation for doing so we need to make a small change to our `tsconfig.json` file located at the project root. Open the file and remove the `"src/setupTests.ts"` line from the `exclude` list (line 28ish). The end result should look similar to the following:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "lib": ["es6", "dom"],
    "module": "esnext",
    "moduleResolution": "node",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "outDir": "build/dist",
    "rootDir": "src",
    "sourceMap": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "target": "es5"
  },
  "exclude": [
    "acceptance-tests",
    "build",
    "jest",
    "node_modules",
    "scripts",
    "webpack"
  ]
}
```

## Enzyme Install & Config

Our environment is looking a little better, awesome! Let's install and configure Enzyme.

### Installation

Okay, so the first pitfall you're going to run into while setting up enzyme with React is that it currently requires an Adapter to work with React. You'll need to install the adapter in addition to the base module. Also, we are going to install a json converter to help us with snapshot tests. Let's do it!

```
$: npm install -D enzyme enzyme-adapter-react-16 enzyme-to-json @types/enzyme @types/enzyme-adapter-react-16
```

> __*NOTE*__
>
> Notice that we used the `-D` option with `npm install`. This is a shorthand flag telling npm to install the following packages as development dependencies. This is a good practice for deployment. We don't want to install our development dependencies on a production environment!
>
> __*NOTE*__
>
> Because we are using TypeScript we need to pay special attention while installing npm packages. Most npm packages are starting to be deployed with a Types file for TypeScript but for those that don't we have to install them manually. We do this here for both `enzyme` and `enzyme-adapter-react-16`.

### Configuration

Now that we have Enzyme installed, we need to setup our test environment to use our adapater for each test. We can do this by adding a `setupTests.ts` file in the `src/` directory. Open your editor and add a new file at `src/setupTests.ts` and add the following content:

```TypeScript
// src/setupTests.ts
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
```

> __*NOTE*__
>
> A create-react-app application with Jest is configured to run `src/setupTests.ts` before running each test file. This is where we can add gobal dependencies for our test suite and it is most appropriate to setup the Enzyme adapter here.

### Our First Test

Okay, now that we have Enzyme installed and configured we need to update our only test file. Open your editor and change the test file to match the following:

```TypeScript
// src/tests/components/App/index.tst.tsx
import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../../../components/App';

describe('App', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const tree = enzyme.shallow(<App />);
      expect(shallowToJson(tree)).toMatchSnapshot();
    });
  });
});
```

*What did we do?*

Well, the first thing to notice at that we are now importing `enzyme` and `shallowToJson` from `enzyme-to-json`. Next, we wrapped up our tests in a nice little `describe` routine for our component. Finally, we created a `describe` routine for our `snapshot` tests and modified the test to use `enzyme` and `shallow-to-json` to capture a snapshot.

### Results, Results, Results

All done! At this point we have a nice boilerplate app configured to run a kick-ass test framework employing some of the coolest linting rules. Good job!

```
$: npm run coverage
```

Results
```
 PASS  src\tests\components\App\index.test.tsx
  App
    snapshot
      √ renders correctly (10ms)


=============================== Coverage summary ===============================
Statements   : 100% ( 9/9 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 2/2 )
Lines        : 100% ( 8/8 )
================================================================================
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        8.367s
Ran all test suites.
```

## Environment File

Okay, the last thing we should do is prevent our app from opening a browser every time we run it. This is totally optional but I feel like if I want my browser open I'll choose the browser I want to open and not rely on React to do it for me.

Add a `.env` file to the prject root with the following content:

```
BROWSER=none
```
