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

export const Dish: React.FC = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = hooks.useAppNavigation();
  const {dishId} = route.params as {dishId: number};

  const {dish, isLoading: dishIsLoading} = hooks.useGetDish(dishId);
  const {reviews, isLoading: reviewsIsLoading} = hooks.useGetReviews();

  if (dishIsLoading || reviewsIsLoading) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return (
      <components.Header
        showGoBack={true}
        title="Dish Details"
        showBasket={true}
      />
    );
  };

  const renderImage = () => {
    return (
      <Image
        source={{uri: dish?.image}}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: 1,
          marginBottom: 10,
        }}
      />
    );
  };

  const renderDetails = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
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
          {dish?.name}
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
          {dish?.description}
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
            ${dish?.price.toFixed(2)}
          </Text>
          <View
            style={{
              marginBottom: 1,
              ...constants.flex.rowAlignCenter,
              gap: 5,
            }}
          >
            <svg.StarSvg />
            <Text
              style={{
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {reviews?.length} Review
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 40}}>
        <components.Button
          title="Add to Cart"
          onPress={() => {
            if (dish) {
              dispatch(addToCart(dish));
              showMessage({
                message: `${dish.name} added to cart`,
                type: 'success',
              });
            }
          }}
          style={{marginBottom: 10}}
        />
        <components.Button
          title="Remove from Cart"
          onPress={() => {
            if (dish) {
              dispatch(removeFromCart(dish));
              showMessage({
                message: `${dish.name} removed from cart`,
                type: 'success',
              });
            }
          }}
          style={{backgroundColor: '#E8F9F1'}}
          textStyle={{color: constants.colors.seaGreenColor}}
        />
      </View>
    );
  };

  const renderReviews = () => {
    return (
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <components.BlockHeading
          title={`Happy clients say (${reviews?.length || 0})`}
          viewAllOnPress={() => navigation.navigate(constants.routes.reviews)}
          containerStyle={{marginBottom: 14}}
        />
        <View style={{gap: 14}}>
          {reviews.slice(0, 3).map((review: ReviewType) => {
            return <items.ReviewItem key={review.id} review={review} />;
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
          paddingTop: 10,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderImage()}
        {renderDetails()}
        {renderButtons()}
        {renderReviews()}
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
