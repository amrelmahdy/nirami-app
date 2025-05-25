// @ts-nocheck
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { reactotronRedux } from 'reactotron-redux';
// import Immutable from 'seamless-immutable';
import { NativeModules } from 'react-native';

let configOptions; // config options will allow us to connect to physical device through ip address
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL?.split('://')[1]?.split(':')[0];

  if (scriptHostname) {
    configOptions = { host: scriptHostname };
  }
}

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure(configOptions) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
//   .use(reactotronRedux({ onRestore: Immutable }))
  .connect(); // let's connect!
console.tron = Reactotron.log; // add reactotron logger to console to be available allover the app

export default reactotron;
