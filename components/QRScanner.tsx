
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconSymbol } from '@/components/IconSymbol';
import { useAppTheme } from '@/contexts/ThemeContext';
import { commonStyles } from '@/styles/commonStyles';

interface QRScannerProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export default function QRScanner({ visible, onClose, onScan }: QRScannerProps) {
  const { colors } = useAppTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    if (visible) {
      getBarCodeScannerPermissions();
    }
  }, [visible]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    console.log('QR Code scanned:', data);
    onScan(data);
    onClose();
  };

  const resetScanner = () => {
    setScanned(false);
  };

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
    webNotSupported: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.currentBackground,
      padding: 20,
    },
    webText: {
      fontSize: 16,
      color: colors.currentText,
      textAlign: 'center',
      lineHeight: 24,
    },
  });

  if (Platform.OS === 'web') {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>QR Scanner</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark" size={24} color={colors.currentText} />
            </TouchableOpacity>
          </View>
          <View style={styles.webNotSupported}>
            <IconSymbol name="camera.fill" size={64} color={colors.currentTextSecondary} />
            <Text style={styles.webText}>
              QR code scanning is not supported on web.{'\n\n'}
              Please manually enter the XRP address or use the mobile app for QR scanning.
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (hasPermission === null) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>QR Scanner</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark" size={24} color={colors.currentText} />
            </TouchableOpacity>
          </View>
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>Requesting camera permission...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (hasPermission === false) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>QR Scanner</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark" size={24} color={colors.currentText} />
            </TouchableOpacity>
          </View>
          <View style={styles.permissionContainer}>
            <IconSymbol name="camera.fill" size={64} color={colors.currentTextSecondary} />
            <Text style={styles.permissionText}>
              Camera permission is required to scan QR codes.{'\n\n'}
              Please grant camera access in your device settings.
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={() => BarCodeScanner.requestPermissionsAsync()}
            >
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconSymbol name="xmark" size={24} color={colors.currentText} />
          </TouchableOpacity>
        </View>
        
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Position the QR code within the frame to scan an XRP address
          </Text>
        </View>
        
        {scanned && (
          <TouchableOpacity
            style={[styles.permissionButton, { position: 'absolute', bottom: 50, alignSelf: 'center' }]}
            onPress={resetScanner}
          >
            <Text style={styles.permissionButtonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}
