import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {svg} from '@/assets/svg';
import {constants} from '@/constants';

type Promocode = {
  id: string;
  name: string;
  code: string;
  logo: string;
  discount: number;
  expiresAt: string;
};

type Props = {
  promocode: Promocode;
};

export const PromocodeItem: React.FC<Props> = ({promocode}) => {
  const handleCopy = () => {
    showMessage({
      message: `Promocode ${promocode.code} copied to clipboard!`,
      type: 'success',
      icon: 'success',
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        borderWidth: 1,
        borderColor: '#F1F1F1',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 12,
      }}
      onPress={handleCopy}
    >
      <Image
        source={{uri: promocode.logo}}
        style={{width: 55, height: 55, borderRadius: 8}}
        resizeMode="cover"
      />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 16,
            color: constants.colors.mainDarkColor,
            fontWeight: 'bold',
            marginBottom: 3,
            ...constants.typography.Roboto_Regular,
          }}
          numberOfLines={1}
        >
          {promocode.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: constants.colors.redColor,
            marginBottom: 3,
            ...constants.typography.Roboto_Regular,
          }}
          numberOfLines={1}
        >
          {promocode.discount}% Off
        </Text>
        <Text
          style={{fontSize: 14, ...constants.typography.Roboto_Regular}}
          numberOfLines={1}
        >
          Valid until {promocode.expiresAt}
        </Text>
      </View>
      <svg.CopySvg />
    </TouchableOpacity>
  );
};
