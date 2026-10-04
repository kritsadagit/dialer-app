import React, {FC, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {backspace, star} from '@assets/icons';
import {
  BGCOLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  DARK_COLOR,
} from '@styles/globalStyles';
import {styles} from './styles';

interface Props {
  input: string;
  senderKeypad: (item: string) => void;
  senderDelPress: () => void;
  senderDelLongPress: () => void;
}

const KeypadButton: FC<Props> = ({
  input,
  senderKeypad,
  senderDelPress,
  senderDelLongPress,
}) => {
  const {scale} = useWindowDimensions();
  const isTablet = DeviceInfo.isTablet();
  const dialPad = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '*',
    '0',
    '#',
    '',
    '',
    'del',
  ];
  const _spacingGap = isTablet ? scale * 14 : scale * 7;
  const buttonSize = isTablet ? scale * 70 : scale * 30;

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const onHandlePressIn = (item: string) => {
    setActiveButton(item);
  };

  const onHandlePressOut = () => {
    setActiveButton(null);
  };

  const onPressKeypad = (item: string) => {
    if (item === 'del') {
      senderDelPress();
    } else {
      senderKeypad(item);
    }
  };

  const onHandleFormat = (input: string) => {
    if (input.length === 4) {
      console.log('input: ', input);
    }
  };

  const onHandleLongPress = (item: string) => {
    if (item === 'del') {
      senderDelLongPress();
    }
  };

  const renderIcon = (isStarButton: boolean) => {
    return isStarButton ? star : backspace;
  };

  const renderKeypadButton = ({item}: {item: string}) => {
    const isActive = item === activeButton;
    const buttonColor = isActive ? PRIMARY_COLOR : SECONDARY_COLOR;
    const isStarButton = item === '*';
    const isDelButton = item === 'del';
    const sizeIcons = isTablet ? scale * 22 : scale * 12;

    return (
      <TouchableOpacity
        disabled={item === ''}
        onPress={() => onPressKeypad(item)}
        onPressIn={() => onHandlePressIn(item)}
        onLongPress={() => onHandleLongPress(item)}
        onPressOut={onHandlePressOut}
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor: item === '' ? BGCOLOR : buttonColor,
            width: buttonSize,
            height: buttonSize,
            borderRadius: scale * 100,
          },
        ]}
      >
        {isDelButton || isStarButton ? (
          <Image
            source={renderIcon(isStarButton)}
            style={{width: sizeIcons, height: sizeIcons}}
          />
        ) : (
          <Text
            allowFontScaling={false}
            style={[styles.number, {color: DARK_COLOR}]}
          >
            {item}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={dialPad}
      numColumns={3}
      renderItem={renderKeypadButton}
      columnWrapperStyle={{gap: _spacingGap}}
      contentContainerStyle={{gap: _spacingGap}}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default KeypadButton;
