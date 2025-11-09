import React, {useRef, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';

const {width} = Dimensions.get('window');

export const Onboarding: React.FC = () => {
  const [page, setPage] = useState(0);
  const navigation = hooks.useAppNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const insets = useSafeAreaInsets();

  const slides = constants.data.onboarding;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(newPage);
  };

  const renderSlider = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
        >
          {slides.map((item, index) => (
            <View
              key={index}
              style={{
                width,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Image
                source={{uri: item.image}}
                style={{
                  width: '86%',
                  aspectRatio: 1,
                  resizeMode: 'contain',
                  marginTop: 20,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          backgroundColor: constants.colors.seaGreenColor,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: insets.bottom + 20,
          paddingTop: 48,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'capitalize',
            color: constants.colors.whiteColor,
            marginBottom: 22,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {slides[page].title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: constants.colors.whiteColor,
            fontSize: 16,
            marginBottom: 47,
            maxWidth: 278,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 24,
            ...constants.typography.Roboto_Regular,
          }}
        >
          {slides[page].description}
        </Text>
        <View
          style={{
            marginBottom: 20,
            gap: 10,
            ...constants.flex.rowAlignCenterCenter,
          }}
        >
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor:
                  i === page
                    ? constants.colors.orangeColor
                    : constants.colors.whiteColor,
              }}
            />
          ))}
        </View>
        <components.Button
          title="Get Started"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={{
            backgroundColor: constants.colors.orangeColor,
          }}
        />
      </View>
    );
  };

  return (
    <components.SafeAreaView edges={['top', 'left', 'right']}>
      {renderSlider()}
      {renderDetails()}
    </components.SafeAreaView>
  );
};
