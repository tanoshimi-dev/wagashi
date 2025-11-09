import React, {useMemo} from 'react';
import {View, ScrollView, FlatList} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {DishType, SweetType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';

export const HomeBack: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const {data, isLoading} = hooks.useGetDishes();

  const {data: sweetsData, isLoading: isSweetsLoading} = hooks.useGetSweets();

  const categories: string[] = data
    ? Array.from(new Set(data.map((dish: DishType) => dish.category)))
    : [];

  const recommended = useMemo(
    () => (data ? data.filter((dish: DishType) => dish.isRecommended) : []),
    [data],
  );

  const popular = useMemo(
    () => (data ? data.filter((dish: DishType) => dish.isPopular) : []),
    [data],
  );

  if (isLoading || isSweetsLoading) {
    return <components.Loader />;
  }

  console.log('sweetsData', sweetsData);
  console.log('sweetsData isSweetsLoading', isSweetsLoading);

  const renderHeader = () => {
    return (
      <components.Header
        showBasket={true}
        showBurger={true}
        title="SWEET HOME"
        titleStyle={{fontWeight: 500}}
      />
    );
  };

  const renderCategories = () => {
    return (
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({item}) => <items.CategoryItem category={item} />}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 30}}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          gap: 10,
        }}
      />
    );
  };

  const renderPopularDishes = () => {
    return (
      <View style={{marginBottom: 30}}>
        <components.BlockHeading
          title="Popular Sweets"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.shop, {category: 'Popular'});
          }}
          containerStyle={{marginBottom: 14, marginLeft: 20, marginRight: 20}}
        />
        <FlatList
          data={popular}
          renderItem={({item}) => <items.PopularItem dish={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={155}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            gap: 16,
          }}
          style={{overflow: 'visible'}}
        />
      </View>
    );
  };

  const recommendedDishes = () => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <components.BlockHeading
          title="Recommended Dishes"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.shop, {
              category: 'Recommended',
            });
          }}
          containerStyle={{marginBottom: 14}}
        />
        <View style={{gap: 16}}>
          {recommended?.map((dish: DishType, index: number) => {
            return <items.RecommendedItem key={index} dish={dish} />;
          })}
        </View>
      </View>
    );
  };


  const renderShopNews = () => {
    return (
      <View style={{marginBottom: 30}}>
        <components.BlockHeading
          title="Popular Sweets"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.shop, {category: 'Popular'});
          }}
          containerStyle={{marginBottom: 14, marginLeft: 20, marginRight: 20}}
        />
        <FlatList
          data={popular}
          renderItem={({item}) => <items.NewsItem sweet={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={155}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            gap: 16,
          }}
          style={{overflow: 'visible'}}
        />
      </View>
    );
  };

  const sweetsItems = () => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <components.BlockHeading
          title="Recommended Dishes"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.shop, {
              category: 'Recommended',
            });
          }}
          containerStyle={{marginBottom: 14}}
        />
        <View style={{gap: 1}}>
          {sweetsData && sweetsData.products?.map((sweet: SweetType, index: number) => {
            return <items.NewsItem key={index} sweet={sweet} />;
          })}
        </View>
      </View>
    );
  };

   const sweetsItems2 = () => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <components.BlockHeading
          title="Recommended Dishes"
          viewAllOnPress={() => {
            navigation.navigate(constants.routes.shop, {
              category: 'Recommended',
            });
          }}
          containerStyle={{marginBottom: 14}}
        />
        <View style={{gap: 16}}>
          {sweetsData && sweetsData.products?.map((sweet: SweetType, index: number) => {
            return <items.SweetItem key={index} sweet={sweet} />;
          })}
        </View>
      </View>
    );
  };


  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 25,
          paddingBottom: 20,
        }}
      >
        {/* {renderCategories()}
        {renderPopularDishes()}
        {recommendedDishes()} */}

        
        {renderCategories()}
        {/* {renderShopNews()} */}
        {sweetsItems()}
        {sweetsItems2()}
      

      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};
