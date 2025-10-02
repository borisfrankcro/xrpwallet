
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function BrandFooter() {
  const { colors } = useAppTheme();

  const openSupportLink = () => {
    Linking.openURL('mailto:support@xrpwallet.com?subject=XRP Wallet Support');
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: colors.currentTextSecondary + '30',
    },
    brandText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.currentText,
      marginBottom: 4,
    },
    authorText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      marginBottom: 8,
    },
    supportLink: {
      fontSize: 12,
      color: colors.currentPrimary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.brandText}>XRP WALLET</Text>
      <Text style={styles.authorText}>made by Boki zg</Text>
      <TouchableOpacity onPress={openSupportLink}>
        <Text style={styles.supportLink}>Support & Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
