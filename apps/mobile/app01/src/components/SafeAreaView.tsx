import React from 'react';
import {
  Edge,
  SafeAreaView as SafeAreaViewRB,
} from 'react-native-safe-area-context';

import {constants} from '@/constants';

type SafeAreaViewProps = {
  edges?: Edge[];
  children: React.ReactNode;
};

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  edges = ['top', 'left', 'right', 'bottom'],
}) => {
  return (
    <SafeAreaViewRB
      style={{flex: 1, backgroundColor: constants.colors.whiteColor}}
      edges={edges}
    >
      {children}
    </SafeAreaViewRB>
  );
};
