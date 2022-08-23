import React from 'react';
import {Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './styles';
import {Provider} from 'react-redux';
import {store} from './store';
import {I18nextProvider} from 'react-i18next';
import i18n from './config/i18n';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Text>Hello world!</Text>
      </I18nextProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
