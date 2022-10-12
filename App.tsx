/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Main from './scr/components/Main';
import {UserProvider} from './scr/context/UserContext';

const App = () => {
  return <UserProvider>{<Main />}</UserProvider>;
};

export default App;
