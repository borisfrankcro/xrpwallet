
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface XRPLogoProps {
  size?: number;
  color?: string;
  variant?: 'default' | 'gradient' | 'outline';
  animated?: boolean;
}

export default function XRPLogo({ 
  size = 40, 
  color = '#23292F', 
  variant = 'default',
  animated = false 
}: XRPLogoProps) {
  const renderDefaultLogo = () => (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* XRP Logo Background Circle */}
      <Circle
        cx="50"
        cy="50"
        r="48"
        fill={color}
        stroke="none"
      />
      
      {/* XRP Logo Symbol - Main X shape */}
      <Path
        d="M25 35 L35 25 L50 40 L65 25 L75 35 L60 50 L75 65 L65 75 L50 60 L35 75 L25 65 L40 50 Z"
        fill="white"
        stroke="none"
      />
      
      {/* Inner diamond - top */}
      <Path
        d="M42 42 L50 34 L58 42 L50 50 Z"
        fill={color}
        stroke="none"
      />
      
      {/* Inner diamond - bottom */}
      <Path
        d="M42 58 L50 66 L58 58 L50 50 Z"
        fill={color}
        stroke="none"
      />
    </Svg>
  );

  const renderGradientLogo = () => (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="xrpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#1E3A8A" />
          <Stop offset="50%" stopColor="#3B82F6" />
          <Stop offset="100%" stopColor="#60A5FA" />
        </LinearGradient>
      </Defs>
      
      {/* XRP Logo Background Circle with gradient */}
      <Circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#xrpGradient)"
        stroke="none"
      />
      
      {/* XRP Logo Symbol */}
      <Path
        d="M25 35 L35 25 L50 40 L65 25 L75 35 L60 50 L75 65 L65 75 L50 60 L35 75 L25 65 L40 50 Z"
        fill="white"
        stroke="none"
      />
      
      {/* Inner diamond - top */}
      <Path
        d="M42 42 L50 34 L58 42 L50 50 Z"
        fill="url(#xrpGradient)"
        stroke="none"
      />
      
      {/* Inner diamond - bottom */}
      <Path
        d="M42 58 L50 66 L58 58 L50 50 Z"
        fill="url(#xrpGradient)"
        stroke="none"
      />
    </Svg>
  );

  const renderOutlineLogo = () => (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* XRP Logo Background Circle - outline only */}
      <Circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      
      {/* XRP Logo Symbol */}
      <Path
        d="M25 35 L35 25 L50 40 L65 25 L75 35 L60 50 L75 65 L65 75 L50 60 L35 75 L25 65 L40 50 Z"
        fill={color}
        stroke="none"
      />
      
      {/* Inner diamond - top */}
      <Path
        d="M42 42 L50 34 L58 42 L50 50 Z"
        fill="white"
        stroke="none"
      />
      
      {/* Inner diamond - bottom */}
      <Path
        d="M42 58 L50 66 L58 58 L50 50 Z"
        fill="white"
        stroke="none"
      />
    </Svg>
  );

  const renderLogo = () => {
    switch (variant) {
      case 'gradient':
        return renderGradientLogo();
      case 'outline':
        return renderOutlineLogo();
      default:
        return renderDefaultLogo();
    }
  };

  return (
    <View style={[
      styles.container, 
      { width: size, height: size },
      animated && styles.animated
    ]}>
      {renderLogo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animated: {
    // Add any animation styles here if needed
  },
});
