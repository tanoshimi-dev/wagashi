import React from 'react';
import {ActivityIndicator} from 'react-native';

export const Loader: React.FC = () => {
  return (
    <ActivityIndicator
      size="small"
      color="gray"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    />
  );
};
