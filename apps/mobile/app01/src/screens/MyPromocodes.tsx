import React from 'react';
import {ScrollView} from 'react-native';

import {items} from '@/items';
import {hooks} from '@/hooks';
import {components} from '@/components';

export const MyPromocodes: React.FC = () => {
  const {data, isLoading} = hooks.useGetPromocodes();

  if (isLoading) return null;

  const renderHeader = () => {
    return <components.Header showGoBack={true} title="My Promocodes" />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingTop: 25,
        }}
      >
        {data?.map((promocode: any) => {
          return (
            <items.PromocodeItem key={promocode.id} promocode={promocode} />
          );
        })}
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
