import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {constants} from '@/constants';
import {components} from '@/components';

const orders = [
  {
    id: 456345,
    date: 'Aug 31, 2023',
    time: '8:32 pm',
    status: 'shipping',
    total: 14.4,
    discount: 2.65,
    delivery: 2,
    dishes: [
      {id: 1, name: 'Mushroom Soup', quantity: 1, price: 7.5},
      {id: 2, name: 'Noodle Soup', quantity: 1, price: 6.9},
    ],
  },
  {
    id: 456346,
    date: 'Jul 28, 2023',
    time: '8:32 pm',
    status: 'delivered',
    total: 14.4,
    discount: 2.65,
    delivery: 2,
    dishes: [
      {id: 1, name: 'Mushroom Soup', quantity: 1, price: 7.5},
      {id: 2, name: 'Noodle Soup', quantity: 1, price: 6.9},
    ],
  },
  {
    id: 456347,
    date: 'Jun 11, 2023',
    time: '8:32 pm',
    status: 'canceled',
    total: 14.4,
    discount: 2.65,
    delivery: 2,
    dishes: [
      {id: 1, name: 'Mushroom Soup', quantity: 1, price: 7.5},
      {id: 2, name: 'Noodle Soup', quantity: 1, price: 6.9},
    ],
  },
];

export const OrderHistory: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined as never) ? [] : sections);
  };

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Order History" />
  );

  const accordionHeader = (section: any) => (
    <View style={{padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            ...constants.typography.Roboto_Regular,
            color: constants.colors.textColor,
          }}
        >
          #{section.id}
        </Text>
        {section.status === 'shipping' && (
          <Text
            style={{
              color: '#FFA462',
              ...constants.typography.Roboto_Regular,
            }}
          >
            Shipping
          </Text>
        )}
        {section.status === 'delivered' && (
          <Text
            style={{color: '#00824B', ...constants.typography.Roboto_Regular}}
          >
            Delivered
          </Text>
        )}
        {section.status === 'canceled' && (
          <Text
            style={{color: '#F84C6B', ...constants.typography.Roboto_Regular}}
          >
            Canceled
          </Text>
        )}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 12,
            color: constants.colors.textColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {section.date}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            color: constants.colors.seaGreenColor,
            ...constants.typography.Roboto_Regular,
          }}
        >
          ${Number(section.total).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const accordionContent = (section: any) => (
    <View
      style={{
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
      }}
    >
      <View>
        {section.dishes.map((item: any) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <View style={{flex: 1, marginRight: 20}}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  ...constants.typography.Roboto_Regular,
                  color: constants.colors.textColor,
                  ...constants.typography.Roboto_Regular,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  ...constants.typography.Roboto_Regular,
                  color: constants.colors.textColor,
                }}
              >
                {item.quantity} x ${item.price}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAccordion = () => (
    <Accordion
      duration={400}
      onChange={setSections}
      activeSections={activeSections}
      renderHeader={accordionHeader}
      renderContent={accordionContent}
      sections={orders}
      touchableComponent={TouchableOpacity}
      containerStyle={{paddingHorizontal: 20}}
      sectionContainerStyle={{
        marginBottom: 8,
        ...constants.styles.boxShadow,
      }}
    />
  );

  const renderContent = () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 15,
      }}
      showsVerticalScrollIndicator={false}
    >
      {renderAccordion()}
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};
