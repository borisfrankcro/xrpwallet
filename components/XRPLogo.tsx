
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface XRPLogoProps {
  size?: number;
  color?: string;
}

export default function XRPLogo({ size = 40, color = '#23292F' }: XRPLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* XRP Logo Background Circle */}
        <Circle
          cx="50"
          cy="50"
          r="48"
          fill={color}
          stroke="none"
        />
        
        {/* XRP Logo Symbol */}
        <Path
          d="M25 35 L35 25 L50 40 L65 25 L75 35 L60 50 L75 65 L65 75 L50 60 L35 75 L25 65 L40 50 Z"
          fill="white"
          stroke="none"
        />
        
        {/* Inner diamond */}
        <Path
          d="M42 42 L50 34 L58 42 L50 50 Z"
          fill={color}
          stroke="none"
        />
        
        <Path
          d="M42 58 L50 66 L58 58 L50 50 Z"
          fill={color}
          stroke="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
