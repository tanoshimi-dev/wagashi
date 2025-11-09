import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import type {ReviewType} from '@/types';
import {constants} from '@/constants';
import {components} from '@/components';
import {hooks} from '@/hooks';

type Props = {
  review: ReviewType;
};

const ReviewItem: React.FC<Props> = ({review}) => {
  const navigation = hooks.useAppNavigation();

  return (
    <View
      style={{
        ...constants.styles.boxShadow,
        padding: 20,
        borderRadius: 10,
      }}
    >
      {/* top block */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 11,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
          paddingBottom: 11,
          gap: 14,
        }}
      >
        <Image
          source={{uri: review.avatar}}
          style={{width: 30, height: 30, borderRadius: 15}}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                color: constants.colors.mainDarkColor,
                fontSize: 14,
                fontWeight: 'bold',
                ...constants.typography.Roboto_Regular,
              }}
              numberOfLines={1}
            >
              {review.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {review.date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <components.RatingStars rating={review.rating} />
            <TouchableOpacity
              onPress={() => navigation.navigate(constants.routes.commentReply)}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: constants.colors.seaGreenColor,
                  fontWeight: '500',
                  ...constants.typography.Roboto_Regular,
                }}
              >
                Reply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* bottom block */}
      <Text
        style={{
          fontSize: 14,
          lineHeight: 21,
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {review.comment}
      </Text>
    </View>
  );
};

export default memo(ReviewItem);
