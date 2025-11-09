import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {Text, TouchableOpacity} from 'react-native';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {actions} from '@/store/actions';

import type {DishType} from '@/types';

type Props = {
  dish: DishType;
};

export const AddToCart: React.FC<Props> = ({dish}) => {
  const dispatch = hooks.useAppDispatch();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#E8F9F1',
        height: 32,
        borderRadius: 5,
        width: '100%',
        ...constants.flex.rowAlignCenterCenter,
      }}
      onPress={() => {
        dispatch(actions.addToCart(dish));
        showMessage({
          message: `${dish.name} added to Cart`,
          type: 'success',
        });
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: constants.colors.seaGreenColor,
          fontWeight: 500,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Add to Cart
      </Text>
    </TouchableOpacity>
  );
};
