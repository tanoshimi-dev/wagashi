import React from 'react';
import {View, Text} from 'react-native';
import {constants} from '@/constants';
import {components} from '@/components';
import {svg} from '@/assets/svg';
import {hooks} from '@/hooks';

export const AccountCreated: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const renderContent = () => (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View style={{marginBottom: 36}}>
        <svg.DoneSvg />
      </View>
      <Text
        style={{
          textTransform: 'capitalize',
          marginBottom: 10,
          color: constants.colors.seaGreenColor,
          textAlign: 'center',
          fontSize: 22,
          ...constants.typography.Roboto_Bold,
        }}
      >
        Account Created!
      </Text>
      <Text
        style={{
          maxWidth: 274,
          textAlign: 'center',
          fontSize: 16,
          marginBottom: 20,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Your account had been created{'\n'}successfully.
      </Text>
      <components.Button
        title="Take me to sign in"
        onPress={() => {
          navigation.replace(constants.routes.signIn);
        }}
        style={{width: '100%'}}
      />
    </View>
  );

  return <components.SafeAreaView>{renderContent()}</components.SafeAreaView>;
};
