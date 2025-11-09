import React from 'react';
import {View, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {items} from '@/items';
import {constants} from '@/constants';
import {components} from '@/components';

import type {ReviewType} from '@/types';

export const Reviews: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const {reviews, isLoading: reviewsIsLoading} = hooks.useGetReviews();

  if (reviewsIsLoading) {
    return <components.Loader />;
  }

  const renderHeader = () => {
    return <components.Header showGoBack={true} title="Reviews" />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, padding: 20, gap: 14}}
        style={{flex: 1, width: '100%'}}
      >
        {reviews?.map((review: ReviewType) => {
          return <items.ReviewItem key={review.id} review={review} />;
        })}
      </ScrollView>
    );
  };

  const renderLeaveReviewBtn = () => {
    return (
      <View style={{padding: 20}}>
        <components.Button
          title="Leave a Review"
          onPress={() => {
            navigation.navigate(constants.routes.leaveAReview);
          }}
        />
      </View>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
      {renderLeaveReviewBtn()}
    </components.SafeAreaView>
  );
};
