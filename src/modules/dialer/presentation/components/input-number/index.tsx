import {TextInput, TextInputInstance} from 'react-native';
import React, {FC} from 'react';
import useResponsive from '@hooks/useResponsive';
import {DARK_COLOR, FONTSIZE_LARGE} from '@styles/globalStyles';

interface Props {
  input: string;
  inputRef: React.RefObject<TextInputInstance | null>;
}

const InputNumber: FC<Props> = ({input, inputRef}) => {
  const {width, fontScale} = useResponsive();

  return (
    <TextInput
      ref={inputRef}
      value={input}
      showSoftInputOnFocus={false}
      numberOfLines={1}
      textAlign="center"
      allowFontScaling={false}
      spellCheck={false}
      autoCorrect={false}
      autoComplete="off"
      disableFullscreenUI={true}
      style={{
        width: width * 0.75,
        color: DARK_COLOR,
        fontSize: fontScale * FONTSIZE_LARGE,
      }}
    />
  );
};

export default InputNumber;
