import React from 'react';
import {Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './styles';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Text>Hello world!</Text>
    </ThemeProvider>
  </Provider>
);

export default App;
