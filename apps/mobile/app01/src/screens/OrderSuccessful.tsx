import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {components} from '@/components';
import {cartActions} from '@/store/cartSlice';

export const OrderSuccessful: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const dispatch = hooks.useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.resetCart());
  }, [dispatch]);

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
      <View style={{marginBottom: 30}}>
        <svg.OrderSuccessSvg />
      </View>
      <Text
        style={{
          fontSize: 24,
          ...constants.typography.Roboto_Bold,
          textTransform: 'capitalize',
          marginBottom: 10,
          color: constants.colors.seaGreenColor,
          textAlign: 'center',
        }}
      >
        Order successful!
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
        Your order will be delivered on time.{'\n'}Thank you!
      </Text>
      <components.Button
        title="View Orders"
        style={{marginBottom: 15, width: '100%'}}
        onPress={() => {
          navigation.navigate(constants.routes.orderHistory);
        }}
      />
      <components.Button
        title="Continue Shopping"
        style={{width: '100%', backgroundColor: '#E8F9F1'}}
        textStyle={{color: constants.colors.seaGreenColor}}
        onPress={() => {
          navigation.navigate(constants.routes.RootLayout, {screen: 'home'});
        }}
      />
    </ScrollView>
  );

  return <components.SafeAreaView>{renderContent()}</components.SafeAreaView>;
};
