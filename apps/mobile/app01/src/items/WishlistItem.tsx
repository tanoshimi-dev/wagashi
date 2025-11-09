import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {actions} from '@/store/actions';

import type {DishType} from '@/types';
import {components} from '@/components';

type Props = {
  dish: DishType;
};

const WishlistItem: React.FC<Props> = ({dish}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const {list: wishlist} = hooks.useAppSelector(state => state.wishlistReducer);
  const isInWishlist = wishlist.some(item => item.id === dish.id);

  return (
    <View
      style={{
        gap: 4,
        ...constants.flex.rowAlignCenter,
        ...constants.styles.boxShadow,
        borderRadius: 10,
        padding: 6,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 20,
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            justifyContent: 'space-between',
          }}
        >
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
          <TouchableOpacity
            onPress={() => dispatch(actions.removeFromWishlist(dish))}
            style={{padding: 6}}
          >
            <svg.WishlistAddSvg
              color={isInWishlist ? constants.colors.redColor : '#BDBDBD'}
            />
          </TouchableOpacity>
        </View>
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
    </View>
  );
};

export default memo(WishlistItem);
