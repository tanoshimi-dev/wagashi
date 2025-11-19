import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

import { useAuth } from '@/context/AuthContext';

export const SignIn: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const { loginBaas, loginLaravel } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('urehop.dev@gmail.com');
  const [password, setPassword] = useState('rehop.dev');
  const [rememberMe, setRememberMe] = useState(false);

  const renderHeader = () => {
    return <components.Header showGoBack={false} title="Sign In" />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: '20%',
        }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            ...constants.typography.Roboto_Bold,
            fontSize: 22,
            marginBottom: 10,
            textAlign: 'center',
            color: constants.colors.orangeColor,
          }}
        >
          Welcome Back John!
        </Text>
        <Text
          style={{
            ...constants.typography.Roboto_Regular,
            fontSize: 16,
            color: constants.colors.textColor,
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          Sign in to continue
        </Text>
        <components.InputField
          placeholder="johndoe@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{marginBottom: 15, width: '100%'}}
        />
        <components.InputField
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={{marginBottom: 20, width: '100%'}}
        />
        <View
          style={{
            ...constants.flex.rowCenterBetween,
            marginBottom: 18,
            width: '100%',
          }}
        >
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={{...constants.flex.rowCenterBetween, gap: 10}}
          >
            <components.Checkbox checked={rememberMe} />
            <Text
              style={{
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              Remember me
            </Text>
          </TouchableOpacity>
          <Text
            style={{color: '#FE724E', ...constants.typography.Roboto_Regular}}
            onPress={() => navigation.navigate(constants.routes.forgotPassword)}
          >
            Forgot password ?
          </Text>
        </View>
        <components.Button
          title="Sign In"
          onPress={() => {
            handleSignIn();
          }}
          style={{width: '100%'}}
        />
      </KeyboardAwareScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{padding: 20, ...constants.flex.rowAlignCenterCenter, gap: 6}}
      >
        <Text
          style={{
            color: constants.colors.mainDarkColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(constants.routes.signUp);
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              color: constants.colors.orangeColor,
              ...constants.typography.Roboto_Regular,
            }}
          >
            Sing up!
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {

      const result = await loginBaas(
        email.toLowerCase().trim(),
        password
      );


      const laravelResult = await loginLaravel(result?.idToken ?? '');

      console.log('SignIn laravel result: ', laravelResult);

      
      // Navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as { message?: string }).message) || errorMessage;
      }
      Alert.alert(
        'Login Failed', 
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </components.SafeAreaView>
  );
};
