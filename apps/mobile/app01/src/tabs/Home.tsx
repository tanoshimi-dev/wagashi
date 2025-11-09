import React, {useMemo, useState} from 'react';
import {View, ScrollView, FlatList, TextInput, Text, Dimensions} from 'react-native';
import {Animated} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {DishType, SweetType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';
import { AnnouncementType } from '@/types/AnnouncementType';

export const Home: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const {data: sweetsData, isLoading: isSweetsLoading} = hooks.useGetSweets();
  const [search, setSearch] = useState('');
  const {data: announcementsData, isLoading: isAnnouncementsLoading} = hooks.useGetAnnouncements();

  if (isSweetsLoading || isAnnouncementsLoading) {
    return <components.Loader />;
  }

  // compute available height
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = 120; // adjust to your header + other fixed areas height
  const contentMaxHeight = windowHeight - headerHeight - 400;


  // const filteredSweets = useMemo(
  //   () =>
  //     sweetsData.products.filter((sweet: SweetType) =>
  //       sweet.name.toLowerCase().includes(search.trim().toLowerCase()),
  //     ),
  //   [sweetsData, search],
  // );

  const rowsToShow = 4;
  const numColumns = 2;
  const maxItems = rowsToShow * numColumns;
//  const visibleSweets = filteredSweets?.slice(0, maxItems) ?? [];
  const visibleSweets = sweetsData?.products?.slice(0, 4) ?? [];

  console.log('sweetsData', sweetsData);
  console.log('sweetsData isSweetsLoading', isSweetsLoading);


  const renderHeader = () => {
    return (
      <components.Header
        showBasket={true}
        showBurger={true}
        title="ホーム"
        titleStyle={{fontWeight: 500}}
      />
    );
  };



  const renderContent = () => {
    return (
      <>
        <components.BlockHeading
          title="新商品"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.products);
            //navigation.navigate('Products');

          }}
          containerStyle={{marginTop: 12, marginBottom: 8, marginLeft: 20, marginRight: 20}}
        />
        <FlatList
          data={visibleSweets}
          keyExtractor={(item: SweetType) => String(item.id)}
          renderItem={({item}) => <items.SweetItem sweet={item} />}
          numColumns={numColumns}
          scrollEnabled={false} 
          contentContainerStyle={{
            paddingLeft: 32,
            paddingRight: 32,
            paddingBottom: 8,
            paddingTop: 8,
          }}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </>
    );
  };


  const renderAnnouncements = () => {
    return (
      <>
        <components.BlockHeading
          title="お知らせ"
          containerStyle={{marginTop: 12, marginBottom: 12, marginLeft: 20, marginRight: 20}}
        />
        <FlatList
          data={announcementsData?.announcements ?? []}
          keyExtractor={(item: AnnouncementType) => String(item.id)}
          renderItem={({item}) => <items.AnnouncementItem announcement={item} />}
          numColumns={1}
          scrollEnabled={false} 
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 8,
            paddingTop: 8,
          }}
          ItemSeparatorComponent={() => (
            <View style={{
              height: 1, 
              backgroundColor: '#E0E0E0', 
              marginVertical: 8
            }} />
          )}
        />
      </>
    );
  };


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 40 /* allow space for bottom */}}
      >
        {renderHeader()}

        <View style={{
          marginTop: 4, 
          height: 64, 
          backgroundColor: constants.colors.orangeColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            ...constants.typography.Roboto_Regular,
          }}>
            毎日をちょっと贅沢に
          </Text>
        </View>

        {renderContent()}
        {renderAnnouncements()}
      </ScrollView>
    </View>
  );
};
