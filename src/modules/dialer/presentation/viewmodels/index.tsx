import {TextInputInstance, Vibration} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import useResponsive from '@hooks/useResponsive';

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

  const recieveKeypad = (item: string) => {
    setInput(prevState => {
      const numOnly = (prevState + item).replace(/[^0-9]/g, '');
      const len = numOnly.length;
      let formatted = '';

      if (len <= 3) {
        formatted = numOnly;
      } else if (len <= 6) {
        formatted = `(${numOnly.slice(0, 3)}) ${numOnly.slice(3, 6)}`;
      } else if (len > 6) {
        formatted += `(${numOnly.slice(0, 3)}) ${numOnly.slice(
          3,
          6,
        )}-${numOnly.slice(6, 10)}`;
      }
      return formatted;
    });
  };

  const recieveDelPress = () => {
    setInput(prevState => prevState.slice(0, -1));
  };

  const recieveDelLongPress = () => {
    setInput('');
    Vibration.vibrate(50);
  };

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
