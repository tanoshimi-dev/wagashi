import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {components} from '@/components';

export const ForgotPasswordSentEmail: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const renderContent = () => (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        Password Successfully Reset!
      </Text>
      <Text
        style={{
          maxWidth: 274,
          textAlign: 'center',
          fontSize: 16,
          marginBottom: 20,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
          lineHeight: 16 * 1.5,
        }}
      >
        You can now log in with your new password.
      </Text>
      <components.Button
        title="Take Me To Sign In"
        style={{width: '100%'}}
        onPress={() => {
          navigation.replace(constants.routes.signIn);
        }}
      />
    </ScrollView>
  );

  return <components.SafeAreaView>{renderContent()}</components.SafeAreaView>;
};
