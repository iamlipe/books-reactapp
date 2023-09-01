import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './styles';
import {Provider} from 'react-redux';
import {store} from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import {Routes} from './routes';
import i18n from './config/i18n';
import {StatusBar} from 'react-native';

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <StatusBar backgroundColor="transparent" translucent />
          <Routes />
        </I18nextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  </Provider>
);

export default App;
