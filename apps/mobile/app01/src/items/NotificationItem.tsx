import React from 'react';
import {View, Text} from 'react-native';

import {constants} from '@/constants';
import type {NotificationType} from '@/types';

type Props = {
  notification: NotificationType;
};

export const NotificationItem: React.FC<Props> = ({notification}) => {
  const Icon = notification.icon;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ECECEC',
        paddingVertical: 19,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 12,
        backgroundColor: '#fff',
      }}
    >
      <Icon width={40} height={40} />
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
          {notification.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
          numberOfLines={1}
        >
          {notification.message}
        </Text>
      </View>
    </View>
  );
};
