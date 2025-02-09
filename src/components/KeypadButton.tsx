import {Text, FlatList, TouchableOpacity, useWindowDimensions, StyleSheet, Image} from "react-native";
import React, {FC, useState} from "react";
import {
  BGCOLOR,
  FONTSIZE_MED,
  LATO_REGULAR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  DARK_COLOR,
} from "../../styles/globalStyles";
import DeviceInfo from "react-native-device-info";

interface Props {
  input: String;
  senderKeypad: (item: string) => void;
  senderDelPress: () => void;
  senderDelLongPress: () => void;
}

const KeypadButton: FC<Props> = ({input, senderKeypad, senderDelPress, senderDelLongPress}) => {
  const {scale} = useWindowDimensions();
  const isTablet = DeviceInfo.isTablet();
  const dialPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#", "", "", "del"];
  const _spacingGap = isTablet ? scale * 14 : scale * 7;
  const buttonSize = isTablet ? scale * 70 : scale * 30;

  console.log("isTablet: ", isTablet);

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const onHandlePressIn = (item: string) => {
    setActiveButton(item);
  };

  const onHandlePressOut = () => {
    setActiveButton(null);
  };

  const onPressKeypad = (item: string) => {
    if (item === "del") {
      senderDelPress();
    } else {
      senderKeypad(item);
    }
  };

  const onHandleLongPress = (item: string) => {
    if (item === "del") {
      senderDelLongPress();
    }
  };

  const renderIcon = (isStarButton: Boolean) => {
    return isStarButton ? require("../../assets/icons/star.png") : require("../../assets/icons/backspace.png");
  };

  const renderKeypadButton = ({item}: {item: string}) => {
    const isActive = item === activeButton;
    const buttonColor = isActive ? PRIMARY_COLOR : SECONDARY_COLOR;
    const isStarButton = item === "*";
    const isDelButton = item === "del";
    const sizeIcons = isTablet ? scale * 22 : scale * 12;

    return (
      <TouchableOpacity
        disabled={item === ""}
        onPress={() => onPressKeypad(item)}
        onPressIn={() => onHandlePressIn(item)}
        onLongPress={() => onHandleLongPress(item)}
        onPressOut={onHandlePressOut}
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor: item === "" ? BGCOLOR : buttonColor,
            width: buttonSize,
            height: buttonSize,
            borderRadius: scale * 100,
          },
        ]}>
        {isDelButton || isStarButton ? (
          <Image source={renderIcon(isStarButton)} style={{width: sizeIcons, height: sizeIcons}} />
        ) : (
          <Text allowFontScaling={false} style={[styles.number, {color: DARK_COLOR}]}>
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

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: FONTSIZE_MED,
    fontFamily: LATO_REGULAR,
  },
});

export default KeypadButton;
