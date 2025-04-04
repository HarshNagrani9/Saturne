// frontend/index.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../components/Signup';
import LinkedinInput from '../components/LinkedinInput';
import Study from '../components/Study';
import Home from '../components/Home';
import VerifyUsers from '../components/VerifyUsers';
import Profile from '../components/Profile';
import Signin from '../components/Signin';
import CollegeCard from '../components/CollegeCard';

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
        name="Signin" 
        component={Signin} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="LinkedinInput" 
        component={LinkedinInput} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Study" 
        component={Study} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="VerifyUsers" 
        component={VerifyUsers} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CollegeCard" 
        component={CollegeCard} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}



