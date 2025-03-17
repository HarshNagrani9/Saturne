import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../components/Signup';
import EmailInput from '../components/EmailInput';
import Study from '../components/Study';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="EmailInput" 
        component={EmailInput} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Study" 
        component={Study} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}