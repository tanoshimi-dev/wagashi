import React from 'react';
import {View} from 'react-native';

import {svg} from '@/assets/svg';
import {constants} from '@/constants';

type Props = {
  rating?: number;
};

export const RatingStars: React.FC<Props> = ({rating = 5}) => {
  return (
    <View style={{...constants.flex.rowAlignCenter, gap: 2}}>
      <svg.StarSvg fillColor={rating >= 1 ? '#FFBC00' : 'transparent'} />
      <svg.StarSvg fillColor={rating >= 2 ? '#FFBC00' : 'transparent'} />
      <svg.StarSvg fillColor={rating >= 3 ? '#FFBC00' : 'transparent'} />
      <svg.StarSvg fillColor={rating >= 4 ? '#FFBC00' : 'transparent'} />
      <svg.StarSvg fillColor={rating >= 5 ? '#FFBC00' : 'transparent'} />
    </View>
  );
};
