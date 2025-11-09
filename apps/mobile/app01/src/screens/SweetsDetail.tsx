import React from 'react';
import {Platform} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {Text, Image, View, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {svg} from '@/assets/svg';
import {ReviewType} from '@/types';
import {constants} from '@/constants';
import {useAppDispatch} from '@/store';
import {components} from '@/components';
import {addToCart} from '@/store/cartSlice';
import {removeFromCart} from '@/store/cartSlice';

import EmulatorDetector from '../constants/EmulatorDetector';
  
// Platform-specific check
const isEmulator = EmulatorDetector.isEmulator();
const isAndroidEmulator = EmulatorDetector.isAndroidEmulator();
const isIOSSimulator = EmulatorDetector.isIOSSimulator();

// Platform-specific backend URLs
const getBackendUrl = () => {
  if (isEmulator) {
    if (isIOSSimulator) {
      return 'http://localhost:10011/'; // iOS simulator
    } else if (isAndroidEmulator) {
      //return 'http://192.168.0.154:10011/'; // Android emulator
      return 'http://10.0.2.2:10011/'; // Android emulator
    }

  } else {
    if (Platform.OS === 'ios') {
      return 'http://192.168.0.154:10011/'; // iOS physical device
    } else if (Platform.OS === 'android') {
      return 'http://10.0.2.2:10011/'; // Android physical device
    }
  }
  return 'http://localhost:10011/'; // Default
};

export const SweetsDetail: React.FC = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const {sweetId} = route.params as {sweetId: number};

  const {data: sweets, isLoading: sweetsIsLoading} = hooks.useGetSweetsDetail(sweetId);
  const {reviews, isLoading: reviewsIsLoading} = hooks.useGetReviews();

  if (sweetsIsLoading || reviewsIsLoading) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return (
      <components.Header
        showGoBack={true}
        title="商品詳細"
        showBasket={true}
      />
    );
  };

  const BASE_URL = getBackendUrl();
  //const BASE_URL = 'http://localhost:10011/';

  const renderImage = () => {
    return (
      <Image
        // source={{uri: `http://192.168.0.154:10011/storage/products/${sweets?.product.id}.png?${Date.now()}`}}
        // source={{uri: `http://10.0.2.2:10011/storage/products/${sweets?.product.id}.png?${Date.now()}`}}
        source={{uri: `${BASE_URL}storage/products/${sweets?.product.id}.png?${Date.now()}`}}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: 1,
          marginBottom: 10,
        }}
      />
    );
  };


  const renderTags = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, paddingLeft: 20}}>
        <Text style={{
          fontSize: 16,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
          paddingTop: 2,
          marginRight: 8,
        }}>
          {`タグ`}
        </Text>

        {sweets?.product_tags?.map(
          (tag: {tag: string}, index: number) => (
            <View
              key={index}
              style={{
                backgroundColor: constants.colors.lightGrayColor,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {tag.tag}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderIngredients = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, paddingLeft: 20}}>
        <Text style={{
          fontSize: 16,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
          paddingTop: 2,
          marginRight: 8,
        }}>
          {`素材`}
        </Text>

        {sweets?.product_ingredients?.map(
          (ingredient: {ingredient: string}, index: number) => (
            <View
              key={index}
              style={{
                backgroundColor: constants.colors.lightGrayColor,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {ingredient.ingredient}
            </Text>
          </View>
        ))}
      </View>
    );
  };


  const renderDetails = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>  
        <Text
          style={{
            fontSize: 24,
            color: constants.colors.mainDarkColor,
            fontWeight: 600,
            marginBottom: 7,
            textTransform: 'capitalize',
            ...constants.typography.Roboto_Regular,
          }}
        >
          {sweets?.product.name}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{
            fontSize: 16,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
            paddingTop: 2,
            marginRight: 8,
          }}>
            {`カテゴリ`}
          </Text>

          <View
            style={{
              backgroundColor: constants.colors.lightGrayColor,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginRight: 8,
              alignSelf: 'flex-start', // Change this from width: 'auto'
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: constants.colors.textColor,
                fontWeight: 600,
                marginBottom: 7,
                textTransform: 'capitalize',
                ...constants.typography.Roboto_Regular,
              }}
            >
              {sweets?.product.category_name}
            </Text>
          </View>
        </View>

        <View style={{...constants.flex.rowCenterBetween, marginBottom: 14}}>
          <Text
            style={{
              fontSize: 24,
              color: '#FE724E',
              fontWeight: 600,
              ...constants.typography.Roboto_Regular,
            }}
          >
            {`￥${sweets?.product.price.toFixed(0)}`}
          </Text>

        </View>

        <Text
          style={{
            fontSize: 18,
            color: constants.colors.textColor,
            marginBottom: 8,
            lineHeight: 16 * 1.5,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {sweets?.product.description}
        </Text>

      </View>
    );
  };



  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderImage()}
        {renderDetails()}
        {renderTags()}
        {renderIngredients()}
      </ScrollView>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}

    </components.SafeAreaView>
  );
};
