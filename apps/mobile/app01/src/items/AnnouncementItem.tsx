import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {AnnouncementType, DishType } from '@/types';
import {constants} from '@/constants';
import {actions} from '@/store/actions';
import {components} from '@/components';

type Props = {
  announcement: AnnouncementType;
};

export const AnnouncementItem: React.FC<Props> = ({announcement}) => {
  const dispatch = hooks.useAppDispatch();
  const navigation = hooks.useAppNavigation();



  return (
    <TouchableOpacity
      style={{
        ...constants.styles.boxShadow,
        borderRadius: 10,
        padding: 12,
        position: 'relative',
        backgroundColor: '#fff',
        //marginBottom: 16,
        //width: Dimensions.get('window').width / 2 - 20 - 7.5,
      }}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(constants.routes.announcementDetail, {announcementId: announcement.id});
      }}
    >
      {/* ${imageUrl}storage/products/${row.getValue('id')}.png?${Date.now()} */}

      <View>
        <Text
          style={{
            fontSize: 14,
            // textAlign: 'center',
            color: constants.colors.mainDarkColor,
            marginBottom: 1,
            fontWeight: '500',
            marginLeft: 5,
            marginRight: 5,
            textTransform: 'capitalize',
            paddingHorizontal: 5,
            ...constants.typography.Roboto_Regular,
            width: '100%',
          }}
          numberOfLines={1}
        >
          {announcement.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            // textAlign: 'center',
            color: constants.colors.mainDarkColor,
            marginBottom: 1,
            fontWeight: '500',
            marginLeft: 5,
            marginRight: 5,
            textTransform: 'capitalize',
            paddingHorizontal: 5,
            ...constants.typography.Roboto_Regular,
            width: '100%',
          }}
          numberOfLines={3}
        >
          {announcement.announcement}
        </Text>

      </View>

    </TouchableOpacity>
  );
};

export default AnnouncementItem;
