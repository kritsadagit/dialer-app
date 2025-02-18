import {TextInput, useWindowDimensions} from "react-native";
import React, {FC} from "react";
import {DARK_COLOR, FONTSIZE_LARGE} from "../../styles/globalStyles";

interface Props {
  input: string;
  inputRef: React.RefObject<TextInput>;
}

const InputDisplay: FC<Props> = ({input, inputRef}) => {
  const {width, fontScale} = useWindowDimensions();

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
      style={{width: width * 0.75, color: DARK_COLOR, fontSize: fontScale * FONTSIZE_LARGE}}
    />
  );
};

export default InputDisplay;
