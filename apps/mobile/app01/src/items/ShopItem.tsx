import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {DishType} from '@/types';
import {constants} from '@/constants';
import {actions} from '@/store/actions';
import {components} from '@/components';

type Props = {
  dish: DishType;
};

export const ShopItem: React.FC<Props> = ({dish}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();

  const {list: cart} = hooks.useAppSelector(state => state.cartReducer);
  const {list: wishlist} = hooks.useAppSelector(state => state.wishlistReducer);
  const isInWishlist = wishlist.some(item => item.id === dish.id);
  const isInCart = cart.some(item => item.id === dish.id);

  return (
    <TouchableOpacity
      style={{
        ...constants.styles.boxShadow,
        borderRadius: 10,
        padding: 12,
        position: 'relative',
        backgroundColor: '#fff',
        marginBottom: 16,
        width: Dimensions.get('window').width / 2 - 20 - 7.5,
      }}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(constants.routes.dish, {dishId: dish.id});
      }}
    >
      <Image
        source={{uri: dish.image}}
        style={{width: '100%', height: 120, borderRadius: 10}}
        resizeMode="cover"
      />
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
        {dish.name}
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 14,
          color: constants.colors.textColor,
          paddingHorizontal: 5,
          ...constants.typography.Roboto_Regular,
        }}
        numberOfLines={1}
      >
        {dish.ingredients?.join(', ') || 'No ingredients'}
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
        ${dish.price.toFixed(2)}
      </Text>
      <components.AddToCart dish={dish} />
    </TouchableOpacity>
  );
};

export default ShopItem;
