import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {Text, Image, View, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {svg} from '@/assets/svg';
import {ReviewType} from '@/types';
import {constants} from '@/constants';
import {useAppDispatch} from '@/store';
import {components} from '@/components';
import {addToCart} from '@/store/cartSlice';
import {removeFromCart} from '@/store/cartSlice';

export const AnnouncementDetail: React.FC = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const {announcementId} = route.params as {announcementId: number};

  const {data: announcement, isLoading: announcementIsLoading} = hooks.useGetAnnouncement(announcementId);

  if (announcementIsLoading) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return (
      <components.Header
        showGoBack={true}
        title="お知らせ詳細"
        showBasket={true}
      />
    );
  };



  const renderDetails = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}} 
        key={announcement?.announcement.id || 'no-id'}>
        <Text
          style={{
            fontSize: 18,
            color: constants.colors.mainDarkColor,
            fontWeight: 600,
            marginBottom: 7,
            textTransform: 'capitalize',
            ...constants.typography.Roboto_Regular,
          }}
        >
          {announcement?.announcement.title || 'No title'}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: constants.colors.textColor,
            marginBottom: 14,
            lineHeight: 16 * 1.5,
            ...constants.typography.Roboto_Regular,
          }}
        >
         {announcement?.announcement.announcement || 'No content'}
        </Text>
        <View style={{...constants.flex.rowCenterBetween}}>
          <Text
            style={{
              fontSize: 24,
              color: '#FE724E',
              fontWeight: 700,
              ...constants.typography.Roboto_Regular,
            }}
          >
          </Text>
        </View>
      </View>
    );
  };


  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderDetails()}
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
