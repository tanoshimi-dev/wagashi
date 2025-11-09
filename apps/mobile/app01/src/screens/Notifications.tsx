import React from 'react';
import {ScrollView} from 'react-native';

import {items} from '@/items';
import {constants} from '@/constants';
import {components} from '@/components';

export const Notifications: React.FC = () => {
  const renderHeader = () => {
    return <components.Header showGoBack={true} title="Notifications" />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, padding: 20}}
      >
        {constants.data.notifications.map((notification, index) => {
          return (
            <items.NotificationItem key={index} notification={notification} />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
