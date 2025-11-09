import React, {useMemo, useState} from 'react';
import {View, ScrollView, TextInput, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import type {DishType, SweetType} from '@/types';
import {components} from '@/components';
import {constants} from '@/constants';

export const Products: React.FC = () => {
  const route = useRoute();
  // const {category} = route.params as {category: string};

  const [search, setSearch] = useState('');

  const {data, isLoading} = hooks.useGetSweets();
  const {data: categoryData, isLoading: isLoadingCategories} = hooks.useGetCategories();

console.log('data', data);

  const sweets: SweetType[] = data?.products || [];
  const categories: string[] = categoryData
    ? Array.from(new Set(categoryData.categories?.map((category: { category: string }) => category.category)))
    : [];

  const filteredSweets = useMemo(
    () =>
      sweets.filter((sweet: SweetType) =>
        // sweet.name.toLowerCase().includes(search.trim().toLowerCase()),
        sweet.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [sweets, search],
  );

console.log('filteredSweets', filteredSweets);

  if (isLoading || isLoadingCategories) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return (
      <components.Header showGoBack={false} title={`商品一覧`} showBasket={false} />
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 8}}>
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
            placeholder="Search..."
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

  const renderCategories = () => {
    return (
      <View style={{marginTop: 8, marginBottom: 8}}>
        <FlatList
          horizontal={true}
          data={categories}
          renderItem={({item}) => <items.CategoryItem category={item} />}
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 8, marginTop: 8}}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            gap: 10,
          }}
        />
      </View>
    );
  };


  const renderSweetsContent = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingLeft: 20,
          paddingRight: 20,
          // paddingBottom: 20,
          paddingTop: 8,
          // flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        {filteredSweets && filteredSweets.map((sweet: { id: any; name?: string; description?: string; price?: number; category?: any; }) => {
          const safeSweet: SweetType = {
            id: sweet.id,
            name: sweet.name ?? '',
            description: sweet.description ?? '',
            price: sweet.price ?? 0,
            category: sweet.category ?? '',
          };
          return <items.SweetItem key={safeSweet.id} sweet={safeSweet} />;
        })}
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: constants.colors.whiteColor}}>
      {renderHeader()}
      {renderSearchBar()}
      {renderCategories()}
      {renderSweetsContent()}
    </View>
  );
};
