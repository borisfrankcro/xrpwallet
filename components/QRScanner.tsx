
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAppTheme } from '@/contexts/ThemeContext';
import { commonStyles } from '@/styles/commonStyles';
import XRPLogo from '@/components/XRPLogo';

interface QRScannerProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export default function QRScanner({ visible, onClose, onScan }: QRScannerProps) {
  const { colors } = useAppTheme();
  const [manualInput, setManualInput] = useState('');

  const handleManualInput = () => {
    if (manualInput.trim()) {
      console.log('Manual XRP address entered:', manualInput.trim());
      onScan(manualInput.trim());
      setManualInput('');
      onClose();
    } else {
      Alert.alert('Error', 'Please enter a valid XRP address');
    }
  };

  const handleSampleAddress = (address: string) => {
    setManualInput(address);
  };

  const sampleAddresses = [
    'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
    'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w',
    'rDNvpKTVWsizkQyWNm4jLSt4hk2hJ2gEoD'
  ];

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
      backgroundColor: colors.currentCard,
      paddingTop: Platform.OS === 'ios' ? 50 : 30,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
    },
    closeButton: {
      padding: 5,
    },
    scanner: {
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanArea: {
      width: 250,
      height: 250,
      borderWidth: 2,
      borderColor: colors.currentSecondary,
      backgroundColor: 'transparent',
    },
    instructions: {
      position: 'absolute',
      bottom: 100,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 20,
      borderRadius: 12,
    },
    instructionText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.currentBackground,
      padding: 20,
    },
    permissionText: {
      fontSize: 16,
      color: colors.currentText,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 24,
    },
    permissionButton: {
      backgroundColor: colors.currentPrimary,
      ...commonStyles.button,
    },
    permissionButtonText: {
      color: colors.currentCard,
      fontSize: 16,
      fontWeight: '600',
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.currentBackground,
      padding: 20,
    },
    inputText: {
      fontSize: 16,
      color: colors.currentText,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 30,
    },
    textInput: {
      backgroundColor: colors.currentCard,
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: colors.currentText,
      width: '100%',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.currentBorder,
    },
    submitButton: {
      backgroundColor: colors.currentPrimary,
      ...commonStyles.button,
      width: '100%',
    },
    submitButtonText: {
      color: colors.currentCard,
      fontSize: 16,
      fontWeight: '600',
    },
    sampleContainer: {
      marginTop: 20,
      width: '100%',
    },
    sampleTitle: {
      fontSize: 14,
      color: colors.currentText,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: '600',
    },
    sampleButton: {
      backgroundColor: colors.currentCard,
      borderRadius: 8,
      padding: 12,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: colors.currentBorder,
    },
    sampleButtonText: {
      color: colors.currentText,
      fontSize: 12,
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: colors.currentBorder,
      marginVertical: 20,
      width: '100%',
    },
  });

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Enter XRP Address</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconSymbol name="xmark" size={24} color={colors.currentText} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <XRPLogo size={64} color={colors.currentPrimary} variant="gradient" />
            <Text style={styles.inputText}>
              QR code scanning is temporarily unavailable.{'\n\n'}
              Please manually enter the XRP address below:
            </Text>
            
            <TextInput
              style={styles.textInput}
              placeholder="Enter XRP address (e.g., rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH)"
              placeholderTextColor={colors.currentTextSecondary}
              value={manualInput}
              onChangeText={setManualInput}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={false}
            />
            
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleManualInput}
            >
              <Text style={styles.submitButtonText}>Check Balance</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.sampleContainer}>
              <Text style={styles.sampleTitle}>
                Or try these sample addresses:
              </Text>
              {sampleAddresses.map((address, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sampleButton}
                  onPress={() => handleSampleAddress(address)}
                >
                  <Text style={styles.sampleButtonText}>{address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
