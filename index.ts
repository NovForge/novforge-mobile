import { registerRootComponent } from 'expo';

import App from './App';

if (typeof document !== 'undefined') {
  document.documentElement.lang = 'ko';
  document.documentElement.translate = false;
  document.documentElement.classList.add('notranslate');
  document.body?.setAttribute('translate', 'no');

  const meta = document.createElement('meta');
  meta.name = 'google';
  meta.content = 'notranslate';
  document.head.appendChild(meta);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
