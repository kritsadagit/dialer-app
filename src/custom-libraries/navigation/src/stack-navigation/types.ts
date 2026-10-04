/* eslint-disable @typescript-eslint/no-explicit-any */
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {ComponentType} from 'react';

export type StackParamList = {
  Error: {fromUnhandledAction?: boolean};
  [key: string]: object | undefined;
};
export interface StackItem<RouteName extends keyof StackParamList, T = any> {
  name: RouteName;
  component: ComponentType<T>;
  options?: any;
  initialParams?: StackParamList[RouteName];
}

export type StackNavigationProps = {
  stack: StackItem<keyof StackParamList>[];
  screenOptions?: NativeStackNavigationOptions;
  initialRouteName?: string;
};
