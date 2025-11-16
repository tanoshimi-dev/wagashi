import React from 'react';
import {View} from 'react-native';

import {svg} from '@/assets/svg';
import {constants} from '@/constants';

type Props = {
  checked?: boolean;
};

export const Checkbox: React.FC<Props> = ({checked}) => {
  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: constants.colors.orangeColor,
        borderRadius: 3,
        borderStyle: 'solid',
        ...constants.flex.rowAlignCenterCenter,
      }}
    >
      {checked && <svg.CheckSvg />}
    </View>
  );
};
