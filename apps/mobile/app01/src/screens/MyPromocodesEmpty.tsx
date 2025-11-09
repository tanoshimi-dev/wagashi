import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const MyPromocodesEmpty: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const [promocode, setPromocode] = useState('');

  const renderHeader = () => {
    return <components.Header showGoBack={true} title="My Promocodes Empty" />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('@/assets/icons/06.png')}
          style={{
            width: '60%',
            height: 'auto',
            aspectRatio: 1,
            alignSelf: 'center',
            marginBottom: 40,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 22,
            color: constants.colors.seaGreenColor,
            marginBottom: 10,
            textAlign: 'center',
            textTransform: 'capitalize',
            maxWidth: 300,
            ...constants.typography?.Roboto_Bold,
          }}
        >
          You do not have Promocodes
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 24,
            color: constants.colors.textColor,
            maxWidth: 300,
            fontSize: 16,
            lineHeight: 16 * 1.5,
            ...constants.typography?.Roboto_Regular,
          }}
        >
          Go hunt for vouchers at Foodsss Voucher right away.
        </Text>
        <components.InputField
          placeholder="Enter the voucher"
          style={{width: '100%', marginBottom: 14}}
          value={promocode}
          onChangeText={setPromocode}
          keyboardType="default"
          autoCapitalize="none"
          maxLength={20}
        />
        <components.Button
          title="Submit"
          style={{width: '100%'}}
          onPress={() => {
            navigation.replace(constants.routes.myPromocodes);
          }}
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
