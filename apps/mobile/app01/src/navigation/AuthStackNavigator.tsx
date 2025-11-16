import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import LoginScreen from '../screen/auth/LoginScreen';
// import RegisterScreen from '../screen/auth/RegisterScreen';
// import EmailVerificationScreen from '../screen/auth/EmailVerificationScreen';
// import PasswordResetScreen from '../screen/auth/PasswordResetScreen';
import {screens} from '@/screens';
import {constants} from '@/constants';

const Stack = createNativeStackNavigator();


export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Stack.Screen 
        name="SignIn" 
        component={screens.SignIn}
      />
      <Stack.Screen 
        name="SignUp" 
        component={screens.SignUp}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;