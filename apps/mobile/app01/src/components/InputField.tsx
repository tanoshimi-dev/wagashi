import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {constants} from '@/constants';

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  maxLength?: number;
  style?: object;
  inputStyle?: object;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  maxLength,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onBlur,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{...(style || {})}}>
      {label && (
        <Text
          style={{
            marginBottom: 6,
            fontSize: 15,
            color: '#222',
            ...(constants.typography?.Roboto_Medium || {}),
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: constants.colors.lightGrayColor || '#F5F6F7',
          borderRadius: 10,
          paddingHorizontal: 16,
          height: 50,
          borderWidth: 1,
          borderColor: error
            ? constants.colors.orangeColor || '#FF4D4F'
            : isFocused
            ? constants.colors.mainDarkColor || '#4F8EF7'
            : 'transparent',
        }}
      >
        {leftIcon && <View style={{marginHorizontal: 4}}>{leftIcon}</View>}
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: '#222',
            paddingVertical: 0,
            ...(constants.typography?.Roboto_Regular || {}),
            ...(inputStyle || {}),
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#8A8D9F'}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
          onFocus={() => {
            setIsFocused(true);
            onFocus && onFocus();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{marginHorizontal: 4}}
          >
            <Text style={{...constants.typography.Roboto_Regular}}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon && <View style={{marginHorizontal: 4}}>{rightIcon}</View>}
      </View>
      {error && (
        <Text
          style={{
            marginTop: 4,
            color: constants.colors.orangeColor || '#FF4D4F',
            fontSize: 13,
            ...(constants.typography?.Roboto_Regular || {}),
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
