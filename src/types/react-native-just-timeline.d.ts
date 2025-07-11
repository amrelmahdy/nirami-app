declare module 'react-native-just-timeline' {
  import * as React from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export interface TimelineDataItem {
    title?: {
      content: React.ReactNode;
      style?: TextStyle;
    };
    description?: {
      content: React.ReactNode;
      style?: TextStyle;
    };
    time?: string;
    lineStyle?: ViewStyle;
    active?: boolean;
  }

  export interface TimelineProps {
    data: TimelineDataItem[];
    timeContainerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    separator?: boolean;
    timeStyle?: TextStyle;
    titleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    lineColor?: string;
    iconStyle?: ViewStyle;
    isRtl?: boolean;
    iconContainerStyle?: ViewStyle;
    lineStyle?: ViewStyle;
    eventStyle?: ViewStyle;
  }

  export const Timeline: React.FC<TimelineProps>;
}