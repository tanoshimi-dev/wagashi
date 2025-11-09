import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import {constants} from '@/constants';
import {components} from '@/components';

const faq = [
  {
    id: 1,
    question: 'How do I place an order?',
    answer:
      'Select a restaurant and dishes, add them to your cart, and proceed to checkout. Enter your address and payment method. After confirming, you can track your order status in the app.',
  },
  {
    id: 2,
    question: 'Can I pay for my order online?',
    answer:
      'Yes, you can pay online using a bank card, Apple Pay, Google Pay, or choose to pay cash to the courier upon delivery.',
  },
  {
    id: 3,
    question: 'How do I use a promo code?',
    answer:
      'Enter your promo code in the special field at checkout. If the promo code is valid, the discount will be applied automatically.',
  },
  {
    id: 4,
    question: 'How can I track my courier?',
    answer:
      'After placing your order, you will see the courier’s location on the map and can track their route in real time.',
  },
  {
    id: 5,
    question: 'What should I do if my order is delayed?',
    answer:
      'If your order is delayed, contact support via the in-app chat or by phone listed in the "Contacts" section. We will help resolve your issue.',
  },
  {
    id: 6,
    question: 'Can I cancel my order?',
    answer:
      'You can cancel your order before the restaurant starts preparing it. Go to "My Orders" and select the order you want to cancel.',
  },
  {
    id: 7,
    question: 'How do I leave feedback about my order?',
    answer:
      'After receiving your order, you can leave feedback and a rating in the "My Orders" section. Your opinion is important and helps us improve our service!',
  },
];

export const FAQ: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = () => (
    <components.Header showGoBack={true} title="FAQ" />
  );

  const renderAccordionHeader = (
    section: (typeof faq)[0],
    index: number,
    isActive: boolean,
  ) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setActiveSections(activeSections[0] === index ? [] : [index]);
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 13,
        marginTop: 14,
      }}
    >
      <Text
        style={{
          fontWeight: '500',
          fontSize: 16,
          color: constants.colors.mainDarkColor,
          flex: 1,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {section.question}
      </Text>
      {/* {isActive
      ? <svg.OpenArrowSvg width={20} height={20} />
      : <svg.CloseArrowSvg width={20} height={20} />} */}
    </TouchableOpacity>
  );

  const renderAccordionContent = (section: (typeof faq)[0]) => (
    <View style={{marginTop: 8, marginBottom: 8}}>
      <Text
        style={{
          fontSize: 15,
          color: constants.colors.textColor,
          lineHeight: 22,
          ...constants.typography.Roboto_Regular,
        }}
      >
        {section.answer}
      </Text>
    </View>
  );

  const renderContent = () => {
    return (
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
        }}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      >
        <Accordion
          sections={faq}
          activeSections={activeSections}
          renderHeader={renderAccordionHeader}
          renderContent={renderAccordionContent}
          onChange={setActiveSections}
          underlayColor="transparent"
          sectionContainerStyle={{}}
        />
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
