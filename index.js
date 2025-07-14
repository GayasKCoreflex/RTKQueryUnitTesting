import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Register App immediately
AppRegistry.registerComponent(appName, () => App);

// Start MSW asynchronously (for dev only)
if (__DEV__) {
  import('./msw.polyfills').then(() => {
    import('./src/mocks/server').then(({ server }) => {
      server.listen();
    });
  });
}
