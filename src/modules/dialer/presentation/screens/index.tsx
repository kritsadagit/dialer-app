import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import DialerViewModel from '../viewmodels';
import InputNumber from '../components/input-number';
import KeypadButton from '../components/keypad-button';

const DialerScreen = () => {
  const {
    input,
    inputRef,
    height,
    recieveKeypad,
    recieveDelPress,
    recieveDelLongPress,
  } = DialerViewModel();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <InputNumber input={input} inputRef={inputRef} />
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
    </SafeAreaView>
  );
};

export default DialerScreen;
