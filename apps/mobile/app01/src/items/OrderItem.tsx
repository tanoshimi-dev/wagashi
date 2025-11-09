import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import type {DishType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';
import {useAppSelector} from '@/store';
import {actions} from '@/store/actions';

type Props = {
  dish: DishType;
};

const OrderItem: React.FC<Props> = ({dish}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const {list: cart} = useAppSelector(state => state.cartReducer);
  const inCart = cart.find(item => item.id === dish?.id);
  const quantity = inCart ? inCart.quantity : 0;

  return (
    <View
      style={{
        gap: 4,
        ...constants.flex.rowAlignCenter,
        ...constants.styles.boxShadow,
        borderRadius: 10,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 4,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(constants.routes.dish, {dishId: dish.id})
        }
        style={{borderRadius: 10}}
      >
        <Image
          source={{uri: dish.image}}
          style={{width: 100, height: 100, borderRadius: 10}}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={{flex: 1, flexDirection: 'column', marginLeft: 8}}>
        <Text
          style={{
            fontSize: 14,
            color: constants.colors.mainDarkColor,
            fontWeight: '500',
            marginBottom: 6,
            textTransform: 'capitalize',
            ...constants.typography.Roboto_Regular,
          }}
          numberOfLines={1}
        >
          {dish.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginBottom: 2,
          }}
        >
          <components.RatingStars rating={3} />
          <Text
            style={{
              fontSize: 12,
              ...constants.typography.Roboto_Regular,
              color: constants.colors.textColor,
            }}
          >
            ({dish.rating})
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: '#666',
            marginTop: 4,
            ...constants.typography.Roboto_Regular,
          }}
          numberOfLines={1}
        >
          {dish.ingredients?.join(', ') || 'No ingredients'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginLeft: 20,
          alignItems: 'center',
          gap: 0,
        }}
      >
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            dispatch(actions.removeFromCart(dish));
          }}
        >
          <svg.MinusSvg />
        </TouchableOpacity>
        <Text style={{fontSize: 10, ...constants.typography.Roboto_Regular}}>
          {quantity}
        </Text>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            dispatch(actions.addToCart(dish));
          }}
        >
          <svg.PlusSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(OrderItem);
