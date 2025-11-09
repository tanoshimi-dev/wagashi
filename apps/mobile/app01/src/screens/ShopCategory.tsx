import React, {useMemo, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {View, Text, ScrollView, TextInput} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {DishType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';

export const ShopCategory: React.FC = () => {
  const route = useRoute();
  const {category} = route.params as {category: string};

  const {data, isLoading} = hooks.useGetDishes();

  const [search, setSearch] = useState('');

  if (isLoading) {
    return <components.Loader />;
  }

  const dishes = useMemo(
    () =>
      data
        ? data.filter(
            (dish: DishType) =>
              dish.category.toLowerCase() === category.toLowerCase(),
          )
        : [],
    [data, category],
  );

  const filteredDishes = useMemo(
    () =>
      dishes.filter((dish: any) =>
        dish.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [dishes, search],
  );

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  const renderHeader = () => (
    <components.Header
      showGoBack={true}
      title={capitalize(category)}
      showBasket={true}
    />
  );

  const renderContent = () => (
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
      {filteredDishes.length > 0 ? (
        filteredDishes.map((dish: DishType) => (
          <items.ShopItem key={dish.id} dish={dish} />
        ))
      ) : (
        <Text
          style={{
            textAlign: 'center',
            width: '100%',
            marginTop: 30,
            color: '#BDBDBD',
            ...constants.typography.Roboto_Regular,
          }}
        >
          No dishes found
        </Text>
      )}
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderSearchBar()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
