import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {constants} from '@/constants';
import {components} from '@/components';

import {svg} from '@/assets/svg';
import type {DishType} from '@/types';

export const News: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const {list: cart, total} = hooks.useAppSelector(state => state.cartReducer);
  const quantity = cart.length;

  const renderHeader = () => {
    return (
      <components.Header showBasket={true} showGoBack={true} title="Order" />
    );
  };

  const renderContent = () => {
    if (cart.length === 0) return null;

    return (
      <ScrollView
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{padding: 20, gap: 14, flexGrow: 1}}
      >
        {cart.map((dish: DishType, index) => {
          return <items.OrderItem key={dish.id} dish={dish} />;
        })}
        <Text
          style={{
            fontSize: 16,
            color: constants.colors.mainDarkColor,
            ...constants.typography.Roboto_Bold,
            marginTop: 10,
          }}
        >
          Total: ({quantity}) items:{' '}
          <Text style={{color: '#E94F08'}}>${total.toFixed(2)}</Text>
        </Text>
        <components.Button
          title="Proceed to Checkout"
          onPress={() => {
            navigation.navigate(constants.routes.checkout);
          }}
          style={{width: '100%'}}
        />
      </ScrollView>
    );
  };

  const renderEmptyState = () => {
    if (cart.length > 0) return null;

    return (
      <ScrollView
        style={{
          marginTop: 20,
          marginBottom: 20,
          padding: 20,
          width: '100%',
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
        }}
      >
        <View style={{marginBottom: 20}}>
          <svg.EmptyBagSvg />
        </View>
        <Text
          style={{
            marginBottom: 11,
            fontSize: 20,
            fontWeight: '700',
            textTransform: 'capitalize',
            color: constants.colors.seaGreenColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          Your Cart is empty
        </Text>
        <Text
          style={{
            maxWidth: 234,
            textAlign: 'center',
            marginBottom: 26,
            fontSize: 14,
            lineHeight: 14 * 1.5,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {`Looks like you haven't added anything to your cart yet.`}
        </Text>
        <components.Button
          title="Shop Now"
          onPress={() => {
            navigation.navigate(constants.routes.RootLayout, {
              screen: 'home',
            });
          }}
          style={{width: '100%'}}
        />
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: constants.colors.whiteColor}}>
      {renderHeader()}
      {renderContent()}
      {renderEmptyState()}
    </View>
  );
};
