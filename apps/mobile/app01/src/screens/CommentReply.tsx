import React from 'react';

import {View, Text, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const CommentReply: React.FC = () => {
  const navigation = hooks.useAppNavigation();

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Reply" />
  );

  const renderContent = () => (
    <KeyboardAwareScrollView
      style={{padding: 20, flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={30}
    >
      <Text
        style={{
          marginBottom: 10,
          fontSize: 16,
          textTransform: 'capitalize',
          fontWeight: '500',
          color: constants.colors.textColor,
          ...constants.typography.Roboto_Regular,
        }}
      >
        Write your reply
      </Text>
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
            color: constants.colors.mainDarkColor,
            backgroundColor: 'transparent',
            borderWidth: 0,
            textAlignVertical: 'top',
            ...constants.typography.Roboto_Regular,
          }}
          multiline
          placeholder="Write your review here..."
        />
      </View>
      <components.Button
        title="Submit Reply"
        style={{width: '100%'}}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </KeyboardAwareScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
