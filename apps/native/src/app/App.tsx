import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SignUp,
  SignIn,
  Home,
  TaskCreateOrUpdate,
} from '@dealerdesk/native/screens';
import { RootStackParamList } from '@dealerdesk/native/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
