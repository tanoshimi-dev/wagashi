import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

import {items} from '@/items';
import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const Profile: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const renderHeader = () => {
    return <components.Header title="Profile" showBasket={true} />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 25,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Image
          source={{
            uri: 'https://george-fx.github.io/mesio-data/users/01.jpg',
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginBottom: 12,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: constants.colors.seaGreenColor,
            ...constants.typography.Roboto_Bold,
            textTransform: 'capitalize',
            marginBottom: 5,
          }}
        >
          Kristin Watsan
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 34,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          +880123 456 789
        </Text>
        <View style={{gap: 18}}>
          <items.ProfileMenuItem
            title="Order History"
            icon={
              <Image
                source={require('@/assets/icons/01.png')}
                style={{width: 40, height: 40}}
              />
            }
            onPress={() => {
              navigation.navigate(constants.routes.orderHistory);
            }}
            description="Review Your Order History"
          />
          <items.ProfileMenuItem
            title="Notifications"
            icon={
              <Image
                source={require('@/assets/icons/02.png')}
                style={{width: 40, height: 40}}
              />
            }
            onPress={() => {
              navigation.navigate(constants.routes.notifications);
            }}
            description="Your Notifications"
          />
          <items.ProfileMenuItem
            title="FAQ"
            icon={
              <Image
                source={require('@/assets/icons/03.png')}
                style={{width: 40, height: 40}}
              />
            }
            onPress={() => {
              navigation.navigate(constants.routes.faq);
            }}
            description="Frequently Questions"
          />
          <items.ProfileMenuItem
            title="My Promocodes"
            icon={
              <Image
                source={require('@/assets/icons/04.png')}
                style={{width: 40, height: 40}}
              />
            }
            description="Your Promocodes"
            onPress={() => {
              navigation.navigate(constants.routes.myPromocodes);
            }}
          />
          <items.ProfileMenuItem
            title="My Promocodes Empty"
            icon={
              <Image
                source={require('@/assets/icons/04.png')}
                style={{width: 40, height: 40}}
              />
            }
            description="Your Promocodes are empty"
            onPress={() => {
              navigation.navigate(constants.routes.myPromocodesEmpty);
            }}
          />
          <items.ProfileMenuItem
            title="Log Out"
            icon={
              <Image
                source={require('@/assets/icons/05.png')}
                style={{width: 40, height: 40}}
              />
            }
            description="Log out from your account"
            // onPress={() => {
            //   navigation.navigate(constants.routes.signIn);
            // }}
            onPress={() => {
              console.log('Log Out pressed');
              navigation.reset({
                index: 0,
                routes: [{ name: constants.routes.signIn }],
              });
            }}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};
