import {View, StyleSheet, useWindowDimensions, Vibration, TextInput} from "react-native";
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

  const recieveInput = (item: string) => {
    setInput(item);
  };

  const recieveKeypad = (item: string) => {
    setInput(prevState => prevState + item);
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
        <InputDisplay input={input} senderInput={recieveInput} inputRef={inputRef} />
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
