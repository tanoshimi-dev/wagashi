import React, {memo} from 'react';
import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {components} from '@/components';
import {actions} from '@/store/actions';

import type {DishType} from '@/types';

type Props = {dish: DishType};

const PopularItem: React.FC<Props> = ({dish}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const {list: wishlist} = hooks.useAppSelector(state => state.wishlistReducer);
  const isInWishlist = wishlist.some(item => item.id === dish.id);
  const {list: cart} = hooks.useAppSelector(state => state.cartReducer);
  const isInCart = cart.some(item => item.id === dish.id);

  const handlePress = () => {
    navigation.navigate(constants.routes.dish, {dishId: dish.id});
  };

  return (
    <TouchableOpacity
      style={{
        width: 170,
        padding: 12,
        paddingTop: 0,
        ...constants.styles.boxShadow,
        overflow: 'visible',
        position: 'relative',
      }}
      onPress={handlePress}
    >
      <Image
        source={{uri: dish.image}}
        style={{
          width: '100%',
          height: 155,
          borderRadius: 10,
          overflow: 'hidden',
          objectFit: 'cover',
        }}
      />
      <Text
        style={{
          fontSize: 14,
          textAlign: 'center',
          color: constants.colors.mainDarkColor,
          marginBottom: 5,
          fontWeight: 500,
          marginLeft: 5,
          marginRight: 5,
          ...constants.typography.Roboto_Regular,
          textTransform: 'capitalize',
        }}
        numberOfLines={1}
      >
        {dish.name}
      </Text>
      <View
        style={{
          gap: 4,
          justifyContent: 'center',
          marginBottom: 11,
          ...constants.flex.rowAlignCenter,
        }}
      >
        <components.RatingStars rating={dish.rating} />
        <Text
          style={{
            fontSize: 12,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {dish.rating}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 600,
          textAlign: 'center',
          color: '#FE724E',
          marginBottom: 11,
        }}
      >
        ${dish.price?.toFixed(2) || '0'}
      </Text>
      <components.AddToCart dish={dish} />
      <View
        style={{
          ...constants.flex.rowCenterBetween,
          position: 'absolute',
          width: Dimensions.get('window').width / 2 - 20 - 7.5,
        }}
      >
        <TouchableOpacity
          style={{padding: 12}}
          onPress={() => {
            dispatch(actions.addToCart(dish));
            showMessage({
              message: `${dish.name} added to Cart`,
              type: 'success',
            });
          }}
        >
          <svg.AddToCartSvg
            color={
              isInCart ? constants.colors.redColor : constants.colors.textColor
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 12}}
          onPress={() => {
            if (isInWishlist) {
              dispatch(actions.removeFromWishlist(dish));
              showMessage({
                message: `${dish.name} removed from Wishlist`,
                type: 'success',
              });
            } else {
              dispatch(actions.addToWishlist(dish));
              showMessage({
                message: `${dish.name} added to Wishlist`,
                type: 'success',
              });
            }
          }}
        >
          <svg.WishlistAddSvg
            color={isInWishlist ? constants.colors.redColor : '#BDBDBD'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PopularItem);
