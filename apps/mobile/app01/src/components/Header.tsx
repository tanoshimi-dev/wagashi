import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {hooks} from '@/hooks';
import {svg} from '@/assets/svg';
import {constants} from '@/constants';
import {useAppSelector} from '@/store';

type Props = {
  title?: string;
  titleStyle?: object;
  showBurger?: boolean;
  showGoBack?: boolean;
  showBasket?: boolean;
};

const menuItems = [
  {
    id: 1,
    titleLine1: '27 Division St, New York,',
    titleLine2: 'NY 10002, USA',
  },
  {
    id: 2,
    titleLine1: 'mesiosale@mail.com',
    titleLine2: 'mesiosupport@mail.com',
  },
  {
    id: 3,
    titleLine1: '+17  123456789',
    titleLine2: '+17  987654321',
  },
];

export const Header: React.FC<Props> = ({
  showGoBack,
  title,
  showBasket,
  showBurger,
  titleStyle,
}) => {
  const navigation = hooks.useAppNavigation();

  const insets = useSafeAreaInsets();

  const {total, list: cart} = useAppSelector(state => state.cartReducer);
  const canGoBack = navigation.canGoBack();

  const [showModal, setShowModal] = useState(false);

  const renderGoBackBtn = () => {
    if (!showGoBack || !canGoBack) return null;
    return (
      <View style={{position: 'absolute', left: 0, height: '100%'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: '100%',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg.GoBackSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBurger = () => {
    if (!showBurger) return null;
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <svg.BurgerSvg />
      </TouchableOpacity>
    );
  };

  const renderTitle = () => {
    if (!title) return null;
    return (
      <Text
        style={{
          ...constants.typography.Roboto_Regular,
          fontSize: 18,
          ...titleStyle,
        }}
      >
        {title}
      </Text>
    );
  };

  const renderBasket = () => {
    if (!showBasket) return null;
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.navigate('RootLayout', {screen: 'order'})}
      >
        <View style={{paddingLeft: 20, flexDirection: 'row'}}>
          <svg.HeaderBasketSvg />
          <View
            style={{
              position: 'absolute',
              right: 15,
              bottom: -3,
              backgroundColor: constants.colors.redColor,
              borderRadius: 30,
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                paddingHorizontal: 6,
                paddingVertical: 4,
                ...constants.typography.Roboto_Bold,
                fontSize: 10,
                color: constants.colors.whiteColor,
                lineHeight: 10 * 1.2,
              }}
            >
              {cart.length > 0 ? `$${total.toFixed(2)}` : '$0'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBurgerMenu = () => {

    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{margin: 0, padding: 0}}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        animationInTiming={500}
        animationOutTiming={500}
        deviceWidth={Dimensions.get('window').width}
        deviceHeight={Dimensions.get('window').height}
        statusBarTranslucent={true}
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            width: Dimensions.get('window').width * 0.8,
            height: '100%',
            backgroundColor: constants.colors.whiteColor,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingTop: 30,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                color: constants.colors.mainDarkColor,
                textTransform: 'capitalize',
                marginBottom: 30,
                fontSize: 20,
                ...constants.typography.Roboto_Medium,
              }}
            >
              Contact us
            </Text>

            <View
              key={`account-detail`}
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(219, 227, 245, 0.5)',
                paddingBottom: 26,
                marginBottom: 10,
                marginLeft: 10,
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: constants.colors.textColor,
                  ...constants.typography.Roboto_Regular,
                }}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate(constants.routes.accountDetail);
                }}
              >
                {`アカウント詳細`}
              </Text>
            </View>

            {menuItems.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(219, 227, 245, 0.5)',
                    paddingBottom: 26,
                    marginBottom: 10,
                    marginLeft: 10,
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: constants.colors.textColor,
                      ...constants.typography.Roboto_Regular,
                    }}
                  >
                    {item.titleLine1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: constants.colors.textColor,
                      ...constants.typography.Roboto_Regular,
                    }}
                  >
                    {item.titleLine2}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={{
        ...constants.flex.rowAlignCenterCenter,
        height: 48,
      }}
    >
      {renderGoBackBtn()}
      {/* {renderBasket()} */}
      {renderBurger()}
      {renderTitle()}
      {renderBurgerMenu()}
    </View>
  );
};
