import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {hooks} from '@/hooks';
import {constants} from '@/constants';

type Props = {
  category: string;
};

const CategoryItem: React.FC<Props> = ({category}) => {
  const navigation = hooks.useAppNavigation();

  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
      }}
      onPress={() => {
        navigation.navigate(constants.routes.shopCategory, {
          category: category.toLowerCase(),
        });
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(CategoryItem);
