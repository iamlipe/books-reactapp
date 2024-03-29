import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useReduxSelector} from '@hooks/useReduxSelector';

import {AuthStack} from './AuthStack';
import {LoggedStack} from './LoggedStack';

export type AppStackParamList = {
  AuthStack: undefined;
  LoggedStack: undefined;
};

const App = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const {auth} = useReduxSelector(state => state.user);

  return (
    <App.Navigator screenOptions={{headerShown: false}}>
      {!auth ? (
        <App.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <App.Screen name="LoggedStack" component={LoggedStack} />
      )}
    </App.Navigator>
  );
};
