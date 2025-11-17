import React, {useState} from 'react';
import {Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const VerifyUser: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const renderHeader = () => {
    return <components.Header showGoBack={true} title="Verification" />;
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
            textAlign: 'center',
            color: constants.colors.seaGreenColor,
            marginBottom: 10,
            fontSize: 22,
            ...constants.typography.Roboto_Bold,
          }}
        >
          Verify
        </Text>
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
          We have sent you an SMS with a code to number +17 0123456789
        </Text>
        <components.InputField
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
          style={{marginBottom: 15, width: '100%'}}
        />
        <components.Button
          title="Confirm"
          onPress={() => {
            navigation.navigate(constants.routes.confirmationCode);
          }}
          style={{width: '100%'}}
        />
      </KeyboardAwareScrollView>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
