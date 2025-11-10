import React from 'react';
import {Platform} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {DishType, SweetType} from '@/types';
import {constants} from '@/constants';
import {actions} from '@/store/actions';
import {components} from '@/components';
import EmulatorDetector from '../constants/EmulatorDetector';

type Props = {
  sweet: SweetType;
};



export const SweetItem: React.FC<Props> = ({sweet}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const {list: cart} = hooks.useAppSelector(state => state.cartReducer);
  const {list: wishlist} = hooks.useAppSelector(state => state.wishlistReducer);


  // const BASE_URL = getBackendUrl();
  const BASE_URL = EmulatorDetector.getAPIUrl();
  //const BASE_URL = 'http://10.0.2.2:10011/';
  //const BASE_URL = 'http://localhost:10011/';

  return (
    <TouchableOpacity
      style={{
        ...constants.styles.boxShadow,
        borderRadius: 10,
        padding: 8,
        position: 'relative',
        backgroundColor: '#fff',
        margin: 0,
        width: Dimensions.get('window').width / 2 - 20 - 7.5,
      }}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(constants.routes.sweetsDetail, {sweetId: sweet.id});
      }}
    >
      {/* ${imageUrl}storage/products/${row.getValue('id')}.png?${Date.now()} */}

      <Image 
        // source={{uri: `http://192.168.0.154:10011/storage/products/${sweet.id}.png?${Date.now()}`}}
        // source={{uri: `http://10.0.2.2:10011/storage/products/${sweet.id}.png?${Date.now()}`}}
        source={{uri: `${BASE_URL}/storage/products/${sweet.id}.png?${Date.now()}`}}
        style={{width: '100%', height: 120, borderRadius: 10}}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: 14,
          textAlign: 'center',
          color: constants.colors.mainDarkColor,
          marginBottom: 5,
          fontWeight: '500',
          marginLeft: 5,
          marginRight: 5,
          textTransform: 'capitalize',
          paddingHorizontal: 5,
          ...constants.typography.Roboto_Regular,
        }}
        numberOfLines={1}
      >
        {sweet.name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '600',
          color: '#FE724E',
          marginBottom: 10,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {`￥${sweet.price.toFixed(0)}`}
      </Text>
    </TouchableOpacity>
  );
};

export default SweetItem;
