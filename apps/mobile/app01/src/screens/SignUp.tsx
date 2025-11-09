import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const SignUp: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Sign Up" />
  );

  const renderContent = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
          color: constants.colors.seaGreenColor,
        }}
      >
        Welcome To Mesio!
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
        Sign up to continue
      </Text>
      <components.InputField
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        keyboardType="default"
        autoCapitalize="words"
        style={{marginBottom: 15, width: '100%'}}
      />
      <components.InputField
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
        style={{marginBottom: 15, width: '100%'}}
      />
      <components.InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{marginBottom: 15, width: '100%'}}
      />
      <components.InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{marginBottom: 20, width: '100%'}}
      />
      <components.InputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{marginBottom: 20, width: '100%'}}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          marginBottom: 20,
          ...constants.flex.rowAlignCenter,
          gap: 10,
        }}
        onPress={() => setAgreeToTerms(!agreeToTerms)}
      >
        <components.Checkbox checked={agreeToTerms} />
        <Text
          style={{
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          You agree to our Terms of Service
        </Text>
      </TouchableOpacity>
      <components.Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate(constants.routes.verifyYourPhoneNumber);
        }}
        style={{width: '100%'}}
      />
    </KeyboardAwareScrollView>
  );

  const renderFooter = () => (
    <View style={{padding: 20, ...constants.flex.rowAlignCenterCenter, gap: 6}}>
      <Text
        style={{
          color: constants.colors.mainDarkColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Already have an account?
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(constants.routes.signIn);
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            color: constants.colors.seaGreenColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          Sign in!
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </components.SafeAreaView>
  );
};
