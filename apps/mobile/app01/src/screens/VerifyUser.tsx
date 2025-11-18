import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

// Then use it in your screens:
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { useAuth } from '@/context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyUser'>;


export const VerifyUser: React.FC<Props> = ({ route }) => {
  const [otpCode, setOtpCode] = useState('');
  const { email } = route.params;
  const { verifyEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = hooks.useAppNavigation();

  // Prevent going back
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Verification Required',
        'Please verify your email to continue.',
        [
          { text: "Continue Verification", style: 'cancel' },
          {
            text: 'Sign In Instead',
            style: 'default',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation]);


  const renderHeader = () => {
    return <components.Header showGoBack={false} title="Verification" />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: '10%',
          paddingBottom: 20,
        }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >

        <Text
          style={{
            maxWidth: 250,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            color: constants.colors.textColor,
            marginBottom: 27,
            fontSize: 16,
            lineHeight: 16 * 1.5,
            ...constants.typography.Roboto_Regular,
          }}
        >
          Check inbox for the OTP code we sent to{'\n'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: constants.colors.textColor,
            marginBottom: 10,
            fontSize: 22,
            ...constants.typography.Roboto_Bold,
          }}
        >
          {email}
        </Text>

        <components.InputField
          placeholder="OTP Code"
          value={otpCode}
          onChangeText={setOtpCode}
          keyboardType="number-pad"
          autoCapitalize="none"
          style={{marginBottom: 15, width: '100%'}}
        />
        <components.Button
          title="Confirm"
          onPress={() => {
            handleVerify();
          }}
          style={{width: '100%'}}
        />
      </KeyboardAwareScrollView>
    );

  };

  const renderFooter = () => (
    <View style={{padding: 20, ...constants.flex.rowAlignCenterCenter, gap: 6}}>
      <Text
        style={{
          color: constants.colors.mainDarkColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Back to
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(constants.routes.signIn);
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            color: constants.colors.orangeColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleVerify = async () => {
    if (!email || !otpCode ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    //setLoading(true);

    try {

      const result = await verifyEmail(
        email,
        otpCode
      );

      console.log('SignUp verifyEmail result: ', result);

      //navigation.navigate(constants.routes.RootLayout, {screen: 'home'});

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
      //setLoading(false);
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
