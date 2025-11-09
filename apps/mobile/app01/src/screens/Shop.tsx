import React, {useMemo, useState} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import type {DishType} from '@/types';
import {components} from '@/components';
import {constants} from '@/constants';

export const Shop: React.FC = () => {
  const route = useRoute();
  const {category} = route.params as {category: string};

  const [search, setSearch] = useState('');

  const {data, isLoading} = hooks.useGetDishes();

  const dishes: DishType[] =
    category === 'Popular'
      ? data?.filter((dish: DishType) => dish.isPopular) || []
      : category === 'Recommended'
      ? data?.filter((dish: DishType) => dish.isRecommended) || []
      : data || [];

  const filteredDishes = useMemo(
    () =>
      dishes.filter((dish: any) =>
        dish.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [dishes, search],
  );

  if (isLoading) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return (
      <components.Header showGoBack={true} title={category} showBasket={true} />
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 16}}>
        <View
          style={{
            height: 50,
            borderRadius: 10,
            backgroundColor: constants.colors.lightGrayColor,
            paddingHorizontal: 20,
          }}
        >
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search dishes..."
            style={{
              borderRadius: 10,
              fontSize: 16,
              color: constants.colors.mainDarkColor,
              height: '100%',
              ...constants.typography.Roboto_Regular,
            }}
            placeholderTextColor="#BDBDBD"
          />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingTop: 20,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {filteredDishes?.map(dish => {
          return <items.ShopItem key={dish.id} dish={dish} />;
        })}
      </ScrollView>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderSearchBar()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
