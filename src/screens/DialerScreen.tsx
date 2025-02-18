import {View, StyleSheet, useWindowDimensions, Vibration, TextInput, Alert} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import KeypadButton from "../components/KeypadButton";
import {BGCOLOR} from "../../styles/globalStyles";
import InputDisplay from "../components/InputDisplay";

const DialerScreen = () => {
  const [input, setInput] = useState("");
  const {height} = useWindowDimensions();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (input.length === 0) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }, [input]);

  const recieveKeypad = (item: string) => {
    setInput(prevState => {
      const numOnly = (prevState + item).replace(/[^0-9]/g, "");
      const len = numOnly.length;
      let formatted = "";

      if (len <= 3) {
        formatted = numOnly;
      } else if (len <= 6) {
        formatted = `(${numOnly.slice(0, 3)}) ${numOnly.slice(3, 6)}`;
      } else if (len > 6) {
        formatted += `(${numOnly.slice(0, 3)}) ${numOnly.slice(3, 6)}-${numOnly.slice(6, 10)}`;
      }
      return formatted;
    });
  };

  const recieveDelPress = () => {
    setInput(prevState => prevState.slice(0, -1));
  };

  const recieveDelLongPress = () => {
    setInput("");
    Vibration.vibrate(50);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <InputDisplay input={input} inputRef={inputRef} />
      </View>

      <View style={[styles.section, {paddingVertical: height * 0.05}]}>
        <KeypadButton
          input={input}
          senderKeypad={recieveKeypad}
          senderDelPress={recieveDelPress}
          senderDelLongPress={recieveDelLongPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGCOLOR,
    justifyContent: "center",
  },
  section: {
    alignItems: "center",
  },
});

export default DialerScreen;
