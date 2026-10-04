import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from '@/custom-libraries/navigation/src/stack-navigation';
import DialerScreen from '@modules/dialer/presentation/screens/dialer-screen';
import CallerScreen from '@modules/dialer/presentation/screens/caller-screen';
import {Routes} from './route';

const stack = [
  {
    name: Routes.DialerScreen,
    component: DialerScreen,
    options: {headerShown: false},
  },
  {
    name: Routes.CallerScreen,
    component: CallerScreen,
    options: {headerShown: false},
  },
];

const RootStack = () => (
  <StackNavigator
    stack={stack}
    screenOptions={{
      headerShown: false,
    }}
  />
);

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default MainNavigation;
