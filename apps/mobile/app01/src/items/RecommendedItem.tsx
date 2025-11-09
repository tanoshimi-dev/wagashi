import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {hooks} from '@/hooks';
import type {DishType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';

type Props = {
  dish: DishType;
};

const RecommendedItem: React.FC<Props> = memo(({dish}) => {
  const navigation = hooks.useAppNavigation();

  return (
    <TouchableOpacity
      style={{
        ...constants.flex.rowAlignCenter,
        ...constants.styles.boxShadow,
        gap: 4,
      }}
      onPress={() =>
        navigation.navigate(constants.routes.dish, {dishId: dish.id})
      }
    >
      <Image
        source={{uri: dish.image}}
        style={{width: 100, height: 100, borderRadius: 10}}
      />
      <View style={{flex: 1, paddingRight: 20}}>
        <View style={{...constants.flex.rowCenterBetween}}>
          <Text
            style={{marginBottom: 6, ...constants.typography.Roboto_Regular}}
          >
            {dish.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: constants.colors.textColor,
              ...constants.typography.Roboto_Regular,
            }}
          >
            {dish.weight} {dish.type === 'drink' ? 'ml' : 'g'}
          </Text>
        </View>
        <View
          style={{...constants.flex.rowAlignCenter, gap: 4, marginBottom: 3}}
        >
          <components.RatingStars rating={dish.rating} />
          <Text
            style={{
              fontSize: 12,
              color: constants.colors.textColor,
              ...constants.typography.Roboto_Regular,
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
    </TouchableOpacity>
  );
});

export default memo(RecommendedItem);
