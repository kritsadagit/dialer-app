import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {backspace, star} from '@assets/icons';
import {SECONDARY_COLOR, PRIMARY_COLOR, DARK_COLOR} from '@styles/globalStyles';
import {styles} from './styles';

interface Props {
  senderKeypad: (item: string) => void;
  senderDelPress: () => void;
  senderDelLongPress: () => void;
}

interface KeypadKeyProps {
  item: string;
  isActive: boolean;
  buttonSize: number;
  sizeIcons: number;
  scale: number;
  onPress: (item: string) => void;
  onPressIn: (item: string) => void;
  onPressOut: () => void;
  onLongPress: (item: string) => void;
}

const DIAL_PAD = [
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

// Memoized so pressing one key only re-renders that key, not the whole pad.
const KeypadKey = memo<KeypadKeyProps>(
  ({
    item,
    isActive,
    buttonSize,
    sizeIcons,
    scale,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
  }) => {
    if (item === '') {
      // Invisible spacer to keep the del button aligned to the right column
      return <View style={{width: buttonSize, height: buttonSize}} />;
    }

    const isStarButton = item === '*';
    const isDelButton = item === 'del';
    const buttonColor = isActive ? PRIMARY_COLOR : SECONDARY_COLOR;

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        onPressIn={() => onPressIn(item)}
        onLongPress={() => onLongPress(item)}
        onPressOut={onPressOut}
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor: buttonColor,
            width: buttonSize,
            height: buttonSize,
            borderRadius: scale * 100,
          },
        ]}
      >
        {isDelButton || isStarButton ? (
          <Image
            source={isStarButton ? star : backspace}
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
  },
);

const KeypadButton: FC<Props> = ({
  senderKeypad,
  senderDelPress,
  senderDelLongPress,
}) => {
  const {scale} = useWindowDimensions();
  const isTablet = useMemo(() => DeviceInfo.isTablet(), []);

  const {spacingGap, buttonSize, sizeIcons} = useMemo(
    () => ({
      spacingGap: isTablet ? scale * 14 : scale * 7,
      buttonSize: isTablet ? scale * 70 : scale * 30,
      sizeIcons: isTablet ? scale * 22 : scale * 12,
    }),
    [isTablet, scale],
  );

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const onHandlePressIn = useCallback((item: string) => {
    setActiveButton(item);
  }, []);

  const onHandlePressOut = useCallback(() => {
    setActiveButton(null);
  }, []);

  const onPressKeypad = useCallback(
    (item: string) => {
      if (item === 'del') {
        senderDelPress();
      } else {
        senderKeypad(item);
      }
    },
    [senderDelPress, senderKeypad],
  );

  const onHandleLongPress = useCallback(
    (item: string) => {
      if (item === 'del') {
        senderDelLongPress();
      }
    },
    [senderDelLongPress],
  );

  const renderKeypadButton = useCallback(
    ({item}: {item: string}) => (
      <KeypadKey
        item={item}
        isActive={item === activeButton}
        buttonSize={buttonSize}
        sizeIcons={sizeIcons}
        scale={scale}
        onPress={onPressKeypad}
        onPressIn={onHandlePressIn}
        onPressOut={onHandlePressOut}
        onLongPress={onHandleLongPress}
      />
    ),
    [
      activeButton,
      buttonSize,
      sizeIcons,
      scale,
      onPressKeypad,
      onHandlePressIn,
      onHandlePressOut,
      onHandleLongPress,
    ],
  );

  return (
    <FlatList
      data={DIAL_PAD}
      numColumns={3}
      renderItem={renderKeypadButton}
      columnWrapperStyle={{gap: spacingGap}}
      contentContainerStyle={{gap: spacingGap}}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default KeypadButton;
