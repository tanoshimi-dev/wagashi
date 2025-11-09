import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {components} from '@/components';

export const Wishlist: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const {list: wishlist} = hooks.useAppSelector(state => state.wishlistReducer);

  const renderHeader = () => {
    return (
      <components.Header showBasket={true} showGoBack={true} title="Wishlist" />
    );
  };

  const renderEmptyState = () => {
    if (wishlist.length > 0) return null;

    return (
      <ScrollView
        style={{
          marginTop: 20,
          marginBottom: 20,
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

  const renderContent = () => {
    if (wishlist.length === 0) {
      return null;
    }

    return (
      <ScrollView
        style={{flex: 1, padding: 20}}
        contentContainerStyle={{flexGrow: 1, gap: 14}}
        showsVerticalScrollIndicator={false}
      >
        {wishlist.map(item => {
          return <items.WishlistItem key={item.id} dish={item} />;
        })}
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
