import {useWindowDimensions} from 'react-native';

const useResponsive = () => {
  const {width, height, fontScale} = useWindowDimensions();

  return {
    width,
    height,
    fontScale,
  };
};

export default useResponsive;
