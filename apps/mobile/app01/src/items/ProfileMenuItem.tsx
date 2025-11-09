import React from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';

import {svg} from '@/assets/svg';
import {constants} from '@/constants';

const DOT_WIDTH = 4;
const DOT_MARGIN = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DOTS_COUNT = Math.floor((SCREEN_WIDTH - 32) / (DOT_WIDTH + DOT_MARGIN));

type Props = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export const ProfileMenuItem: React.FC<Props> = ({
  icon,
  description,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          gap: 12,
          ...constants.flex.rowAlignCenter,
          marginBottom: 14,
        }}
      >
        {icon}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 2,
              color: constants.colors.mainDarkColor,
              ...constants.typography.Roboto_Regular,
            }}
          >
            {title}
          </Text>

          {description && (
            <Text
              style={{
                fontSize: 12,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {description}
            </Text>
          )}
        </View>
        <svg.RightArrowSvg />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {Array.from({length: DOTS_COUNT}).map((_, i) => (
          <View
            key={i}
            style={{
              width: DOT_WIDTH,
              height: 1,
              backgroundColor: '#C8C8D3',
              marginRight: DOT_MARGIN,
              borderRadius: 1,
            }}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};
