import React from 'react';
import {Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from '@/styles';

const App = () => (
  <ThemeProvider theme={theme}>
    <Text>Hello world!</Text>
  </ThemeProvider>
);

export default App;
