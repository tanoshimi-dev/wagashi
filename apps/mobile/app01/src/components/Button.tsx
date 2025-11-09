import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {constants} from '@/constants';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: object;
  textStyle?: object;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: disabled
          ? constants.colors.lightGrayColor || '#E0E0E0'
          : constants.colors.seaGreenColor || '#2AA876',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 24,
        ...(style || {}),
      }}
    >
      {leftIcon && <>{leftIcon}</>}
      {loading ? (
        <ActivityIndicator color={constants.colors.whiteColor || '#fff'} />
      ) : (
        <Text
          style={{
            color: constants.colors.whiteColor || '#fff',
            fontSize: 16,
            ...constants.typography?.Roboto_Bold,
            ...(textStyle || {}),
          }}
        >
          {title}
        </Text>
      )}
      {rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};
