import {TextInputInstance, Vibration} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import useResponsive from '@hooks/useResponsive';

// Pure, no state deps -> declared outside so it isn't recreated every render.
const formatPhoneNumber = (numOnly: string) => {
  const len = numOnly.length;

  if (len <= 3) {
    return numOnly;
  }
  if (len <= 6) {
    return `(${numOnly.slice(0, 3)}) ${numOnly.slice(3, 6)}`;
  }
  return `(${numOnly.slice(0, 3)}) ${numOnly.slice(3, 6)}-${numOnly.slice(
    6,
    10,
  )}`;
};

const DialerViewModel = () => {
  const [input, setInput] = useState('');
  const {height} = useResponsive();

  const inputRef = useRef<TextInputInstance | null>(null);

  useEffect(() => {
    if (input.length === 0) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }, [input]);

  // Stable refs so KeypadButton's memoized keys don't re-render on every keypress.
  const recieveKeypad = useCallback((item: string) => {
    setInput(prevState => {
      const numOnly = (prevState + item).replace(/[^0-9*#]/g, '');
      return formatPhoneNumber(numOnly);
    });
  }, []);

  const recieveDelPress = useCallback(() => {
    setInput(prevState => {
      // strip formatting symbols first so a single press removes one digit, not one symbol
      const numOnly = prevState.replace(/[^0-9*#]/g, '');
      return formatPhoneNumber(numOnly.slice(0, -1));
    });
  }, []);

  const recieveDelLongPress = useCallback(() => {
    setInput('');
    Vibration.vibrate(50);
  }, []);

  return {
    input,
    inputRef,
    height,
    recieveKeypad,
    recieveDelPress,
    recieveDelLongPress,
  };
};

export default DialerViewModel;
