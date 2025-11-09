import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {components} from '@/components';

export const LeaveAReview: React.FC = () => {
  const navigation = hooks.useAppNavigation();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleConfirm = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Leave a review" />
  );

  const renderContent = () => (
    <ScrollView
      style={{
        padding: 20,
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{width: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <svg.CommentSvg />
        </View>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
            lineHeight: 16 * 1.5,
          }}
        >
          Your comments and suggestions help{'\n'}us improve the service quality
          better!
        </Text>
        <components.RatingStarsReview
          containerStyle={{
            marginBottom: 20,
            alignSelf: 'center',
          }}
          setRating={setRating}
          rating={rating}
        />
        <View
          style={{
            marginBottom: 20,
            borderRadius: 10,
            width: '100%',
            backgroundColor: constants.colors.lightGrayColor,
          }}
        >
          <TextInput
            style={{
              height: 127,
              width: '100%',
              padding: 14,
              fontSize: 16,
              color: '#748BA0',
              backgroundColor: 'transparent',
              borderWidth: 0,
              textAlignVertical: 'top',
              ...constants.typography.Roboto_Regular,
            }}
            multiline
            placeholder="Write your review here..."
            value={comment}
            onChangeText={setComment}
          />
        </View>
        <components.Button title="Send Review" onPress={handleConfirm} />
      </View>
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
