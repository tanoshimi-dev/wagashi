import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const ForgetPassword: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    navigation.navigate(constants.routes.newPassword);
  };

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Forgot Password" />
  );

  const renderContent = () => (
    <ScrollView
      style={{
        marginTop: 20,
        padding: 20,
        width: '100%',
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Text
        style={{
          marginBottom: 25,
          maxWidth: 302,
          textAlign: 'center',
          lineHeight: 15 * 1.5,
          alignSelf: 'center',
          color: constants.colors.textColor,
          fontSize: 15,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Please enter your email address. You will receive a link to create a new
        password via email.
      </Text>
      <components.InputField
        placeholder="Email Address"
        style={{marginBottom: 20}}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <components.Button title="Send" onPress={handleSubmit} />
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
