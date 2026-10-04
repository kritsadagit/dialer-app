import {StyleSheet} from 'react-native';
import {BGCOLOR} from '@styles/globalStyles';

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: BGCOLOR,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  section: {
    alignItems: 'center',
  },
});
