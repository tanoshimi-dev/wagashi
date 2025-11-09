import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

export const Checkout: React.FC = () => {
  const cart = hooks.useAppSelector(state => state.cartReducer.list);
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );
  const navigation = hooks.useAppNavigation();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePlaceOrder = () => {
    navigation.replace(constants.routes.orderSuccessful);
  };

  const renderHeader = () => (
    <components.Header showGoBack={true} title="Checkout" />
  );

  const renderOrderSummary = () => (
    <View
      style={{
        ...constants.styles.boxShadow,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 14,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textTransform: 'capitalize',
            ...constants.typography.Roboto_Bold,
            color: constants.colors.mainDarkColor,
          }}
        >
          My order
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: constants.colors.mainDarkColor,
            textTransform: 'capitalize',
            ...constants.typography.Roboto_Bold,
          }}
        >
          ${total.toFixed(2)}
        </Text>
      </View>
      <View>
        {cart.map((dish, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {dish.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: constants.colors.textColor,
                ...constants.typography.Roboto_Regular,
              }}
            >
              {dish.quantity} x ${dish.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderShippingDetails = () => (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          fontSize: 16,
          ...constants.typography.Roboto_Bold,
          marginBottom: 14,
          color: constants.colors.mainDarkColor,
        }}
      >
        Shipping Details
      </Text>
      <components.InputField
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={{marginBottom: 10}}
      />
      <components.InputField
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={{marginBottom: 10}}
      />
      <components.InputField
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{marginBottom: 10}}
      />
    </View>
  );

  const renderCardDetails = () => (
    <View>
      <Text
        style={{
          marginBottom: 14,
          fontSize: 16,
          ...constants.typography.Roboto_Bold,
          color: constants.colors.mainDarkColor,
        }}
      >
        Card Details
      </Text>
      <components.InputField
        value={cardNumber}
        placeholder="Enter your card number"
        onChangeText={setCardNumber}
        style={{marginBottom: 10}}
      />
      <components.InputField
        value={expiryDate}
        placeholder="MM/YY"
        onChangeText={setExpiryDate}
        style={{marginBottom: 10}}
      />
      <components.InputField
        value={cvv}
        placeholder="CVV"
        onChangeText={setCvv}
        style={{marginBottom: 10}}
      />
    </View>
  );

  const renderButton = () => (
    <View style={{padding: 20}}>
      <components.Button
        title="Place Order"
        onPress={handlePlaceOrder}
        style={{marginTop: 10}}
      />
    </View>
  );

  const renderContent = () => (
    <ScrollView
      style={{
        padding: 20,
        flex: 1,
      }}
      contentContainerStyle={{paddingBottom: 30}}
      keyboardShouldPersistTaps="handled"
    >
      {renderOrderSummary()}
      {renderShippingDetails()}
      {renderCardDetails()}
    </ScrollView>
  );

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
      {renderButton()}
    </components.SafeAreaView>
  );
};
