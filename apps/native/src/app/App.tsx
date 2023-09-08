import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SignUp,
  SignIn,
} from '@dealerdesk/native/screens';
import { RootStackParamList } from '@dealerdesk/native/types';
import { Provider } from 'react-redux';
import { store } from '@dealerdesk/native/core';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'Sign In' }}
          />
          <Stack.Screen
            name="TaskCreate"
            component={TaskCreateOrUpdate}
            options={{ title: 'Create Task' }}
          />
          <Stack.Screen
            name="TaskUpdate"
            component={TaskCreateOrUpdate}
            options={{ title: 'Update Task' }}
          />
        </Stack.Navigator>
      </Provider>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
