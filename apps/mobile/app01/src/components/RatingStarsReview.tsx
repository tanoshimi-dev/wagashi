import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View, TouchableOpacity} from 'react-native';

type Props = {
  containerStyle?: object;
  setRating: (value: number) => void;
  rating: number;
};

export const RatingStarsReview: React.FC<Props> = ({
  containerStyle,
  setRating,
  rating,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
        gap: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setRating(1);
          setRating(rating === 1 ? 0 : 1);
        }}
      >
        <Svg width={34} height={33} fill="none">
          <Path
            fill={rating >= 1 ? '#F5C102' : 'transparent'}
            stroke={rating >= 1 ? '#F5C102' : '#F5C102'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 1.463 4.702 9.525a.5.5 0 0 0 .376.273l10.515 1.537-7.609 7.41a.5.5 0 0 0-.144.443l1.796 10.468-9.403-4.945a.5.5 0 0 0-.466 0L7.364 31.12 9.16 20.651a.5.5 0 0 0-.143-.442l-7.608-7.41 10.514-1.538a.5.5 0 0 0 .376-.273L17 1.463Z"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(2)}>
        <Svg width={34} height={33} fill="none">
          <Path
            fill={rating >= 2 ? '#F5C102' : 'transparent'}
            stroke={rating >= 2 ? '#F5C102' : '#F5C102'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 1.463 4.702 9.525a.5.5 0 0 0 .376.273l10.515 1.537-7.609 7.41a.5.5 0 0 0-.144.443l1.796 10.468-9.403-4.945a.5.5 0 0 0-.466 0L7.364 31.12 9.16 20.651a.5.5 0 0 0-.143-.442l-7.608-7.41 10.514-1.538a.5.5 0 0 0 .376-.273L17 1.463Z"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(3)}>
        <Svg width={34} height={33} fill="none">
          <Path
            fill={rating >= 3 ? '#F5C102' : 'transparent'}
            stroke={rating >= 3 ? '#F5C102' : '#F5C102'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 1.463 4.702 9.525a.5.5 0 0 0 .376.273l10.515 1.537-7.609 7.41a.5.5 0 0 0-.144.443l1.796 10.468-9.403-4.945a.5.5 0 0 0-.466 0L7.364 31.12 9.16 20.651a.5.5 0 0 0-.143-.442l-7.608-7.41 10.514-1.538a.5.5 0 0 0 .376-.273L17 1.463Z"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(4)}>
        <Svg width={34} height={33} fill="none">
          <Path
            fill={rating >= 4 ? '#F5C102' : 'transparent'}
            stroke={rating >= 4 ? '#F5C102' : '#F5C102'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 1.463 4.702 9.525a.5.5 0 0 0 .376.273l10.515 1.537-7.609 7.41a.5.5 0 0 0-.144.443l1.796 10.468-9.403-4.945a.5.5 0 0 0-.466 0L7.364 31.12 9.16 20.651a.5.5 0 0 0-.143-.442l-7.608-7.41 10.514-1.538a.5.5 0 0 0 .376-.273L17 1.463Z"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(5)}>
        <Svg width={34} height={33} fill="none">
          <Path
            fill={rating >= 5 ? '#F5C102' : 'transparent'}
            stroke={rating >= 5 ? '#F5C102' : '#F5C102'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m17 1.463 4.702 9.525a.5.5 0 0 0 .376.273l10.515 1.537-7.609 7.41a.5.5 0 0 0-.144.443l1.796 10.468-9.403-4.945a.5.5 0 0 0-.466 0L7.364 31.12 9.16 20.651a.5.5 0 0 0-.143-.442l-7.608-7.41 10.514-1.538a.5.5 0 0 0 .376-.273L17 1.463Z"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};
