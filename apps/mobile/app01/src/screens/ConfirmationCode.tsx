import React, {useRef, useState} from 'react';
import {Text, View, TextInput, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const ConfirmationCode: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [otpCode, setOtpCode] = useState(['', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value.slice(-1);
    setOtpCode(newOtpCode);

    if (value) {
      if (index < otpCode.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = () => {
    Alert.alert('Resend OTP logic goes here');
  };

  const handleConfirm = () => {
    navigation.reset({
      index: 0,
      routes: [{name: constants.routes.accountCreated}],
    });
  };

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Verify your phone number" />
  );

  const renderContent = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
      }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={{
          color: constants.colors.seaGreenColor,
          fontSize: 22,
          marginBottom: 24,
          fontWeight: '700',
          textAlign: 'center',
          ...constants.typography.Roboto_Regular,
        }}
      >
        OTP Verification
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
          gap: 9,
        }}
      >
        {otpCode.map((code, index) => (
          <TextInput
            key={index}
            ref={ref => {
              inputs.current[index] = ref;
            }}
            value={code}
            onChangeText={value => handleCodeChange(index, value)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: '50%',
              borderWidth: 1,
              borderColor: '#2e2e2eff',
              textAlign: 'center',
              fontSize: 22,
              color: constants.colors.mainDarkColor,
              backgroundColor: '#fff',
              ...constants.typography.Roboto_Regular,
            }}
            returnKeyType={index === otpCode.length - 1 ? 'done' : 'next'}
            onSubmitEditing={() => {
              if (index < otpCode.length - 1) {
                inputs.current[index + 1]?.focus();
              }
            }}
          />
        ))}
      </View>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 10,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Didn’t receive the OTP?{' '}
        <Text
          onPress={handleResend}
          style={{
            color: constants.colors.redColor,
            textDecorationLine: 'underline',
            ...constants.typography.Roboto_Regular,
          }}
        >
          Resend.
        </Text>
      </Text>
      <components.Button
        title="Confirm"
        onPress={handleConfirm}
        style={{marginTop: 20}}
      />
    </KeyboardAwareScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
