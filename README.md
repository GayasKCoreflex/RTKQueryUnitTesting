# MSW (Mock Service Worker) Setup in React Native for RTK Query

RTK Query works great with MSW for mocking APIs during development and testing. Here's how to integrate MSW in a React Native project.

---

## Step 1: Install Dependencies and Polyfills

MSW relies on web-standard classes (like `URL`, `TextEncoder`) that are not available in React Native by default.

Install the required packages:

npm install msw --save-dev
npm install react-native-url-polyfill fast-text-encoding


## Step 2: At the root of your project (same level as App.js or index.js), create a file named msw.polyfills.js

// msw.polyfills.js
import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';


## Step 3:Modify your app entry point (index.js or wherever AppRegistry.registerComponent is used):
/ index.js or App entry file

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Register app immediately
AppRegistry.registerComponent(appName, () => App);

// Enable MSW asynchronously in development
if (__DEV__) {
  import('./msw.polyfills').then(() => {
    import('./src/mocks/server').then(({ server }) => {
      server.listen();
    });
  });
}


## Step 4:Create Request Handlers
Create src/mocks/handlers.js:

/ src/mocks/handlers.js

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/user', () =>
    HttpResponse.json({ id: 1, name: 'Jane Doe' })
  ),

  // Add more handlers here as needed
];


## Step 5:Create src/mocks/server.js:

// src/mocks/server.js

import { setupServer } from 'msw/native';
import { handlers } from './handlers';

export const server = setupServer(...handlers);



