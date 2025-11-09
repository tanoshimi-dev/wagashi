import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {constants} from '@/constants';

type Props = {
  title: string;
  viewAllOnPress?: () => void;
  containerStyle?: object;
};

export const BlockHeading: React.FC<Props> = ({
  title,
  containerStyle,
  viewAllOnPress,
}) => {
  return (
    <View style={{...containerStyle, ...constants.flex.rowCenterBetween}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: constants.colors.mainDarkColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {title}
      </Text>
      {viewAllOnPress && (
        <TouchableOpacity onPress={viewAllOnPress}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: constants.colors.redColor,
              ...constants.typography.Roboto_Regular,
            }}
          >
            全て表示
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
