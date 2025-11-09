import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const NewPassword: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [newPassword, setNewPassword] = useState('');

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Reset Password" />
  );

  const handleReset = () => {
    navigation.navigate(constants.routes.forgotPasswordSentEmail);
  };

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
        Please enter your new password.
      </Text>
      <components.InputField
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={{marginBottom: 20}}
        secureTextEntry
      />
      <components.Button title="Reset Password" onPress={handleReset} />
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
