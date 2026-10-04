import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList, StackNavigationProps} from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator: FC<StackNavigationProps> = ({
  stack,
  screenOptions,
  initialRouteName,
}) => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
    >
      {stack.map(
        (
          {name, component: Component, options: option, initialParams},
          index,
        ) => (
          <Stack.Screen
            name={name}
            component={Component}
            key={index.toString()}
            options={option}
            initialParams={initialParams}
          />
        ),
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
