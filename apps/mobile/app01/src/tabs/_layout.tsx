import React from 'react';
import {View, Text} from 'react-native';

import {useLinkBuilder} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PlatformPressable} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {svg} from '@/assets/svg';
import {constants} from '@/constants';

import {Home} from '@/tabs/Home';
import {Order} from '@/tabs/Order';
import {Profile} from '@/tabs/Profile';
import {Wishlist} from '@/tabs/Wishlist';
import { News } from '@/tabs/News';
import { Products } from '@/tabs/Products';
import { StampCard } from '@/tabs/StampCard';

const Tabs = createBottomTabNavigator();

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {


  const {buildHref} = useLinkBuilder();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F5',
      }}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        options.headerShown = false;

        const isFocused = state.index === index;

        const label =
          typeof options.tabBarLabel === 'function'
            ? options.tabBarLabel({
                focused: isFocused,
                color: '',
                position: 'below-icon',
                children: route.name,
              })
            : options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              focused: isFocused,
              color: '',
              size: 0,
            })
          : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}
          >
            <View style={{paddingBottom: 7, paddingTop: 14}}>{icon}</View>
            <Text
              style={{
                color: isFocused
                  ? constants.colors.redColor
                  : constants.colors.textColor,
                marginBottom: 14,
                marginTop: 0,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export const RootLayout = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: constants.colors.whiteColor}}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <Tabs.Navigator
        tabBar={props => <TabBar {...props} />}
        initialRouteName="home"
        backBehavior="history"
        screenOptions={{lazy: false}}
      >
        <Tabs.Screen
          name="home"
          component={Home}
          options={{
            title: 'ホーム',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.redColor
                : constants.colors.textColor;
              return <svg.HomeTabSvg color={color} />;
            },
          }}
        />
        {/* <Tabs.Screen
          name="order"
          component={Order}
          options={{
            title: 'Order',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.seaGreenColor
                : constants.colors.textColor;
              return <svg.OrderTabSvg color={color} />;
            },
          }}
        /> */}
        <Tabs.Screen
          name="Products"
          component={Products}
          options={{
            title: '商品一覧',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.redColor
                : constants.colors.textColor;
              return <svg.SweetProductsTabSvg color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="SampCard"
          component={StampCard}
          options={{
            title: 'スタンプ',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.redColor
                : constants.colors.textColor;
              return <svg.SweetUserStampSvg color={color} />;
            },
          }}
          initialParams={{completedStamps: 7}} // Pass the number here
        />
        <Tabs.Screen
          name="wishList"
          component={Wishlist}
          options={{
            title: 'お気に入り',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.redColor
                : constants.colors.textColor;
              return <svg.WishlistTabSvg color={color} />;
            },
          }}
        />
        
        {/* <Tabs.Screen
          name="wishList"
          component={Wishlist}
          options={{
            title: 'Wishlist',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.seaGreenColor
                : constants.colors.textColor;
              return <svg.WishlistTabSvg color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const color = focused
                ? constants.colors.seaGreenColor
                : constants.colors.textColor;
              return <svg.ProfileTabSvg color={color} />;
            },
          }}
        /> */}
      </Tabs.Navigator>
    </SafeAreaView>
  );
};
