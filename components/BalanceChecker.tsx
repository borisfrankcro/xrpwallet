
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAppTheme } from '@/contexts/ThemeContext';
import { commonStyles } from '@/styles/commonStyles';
import { xrplService, AccountInfo } from '@/utils/xrplUtils';
import QRScanner from '@/components/QRScanner';
import BrandFooter from '@/components/BrandFooter';
import XRPLogo from '@/components/XRPLogo';

export default function BalanceChecker() {
  const { colors } = useAppTheme();
  const [address, setAddress] = useState('');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const checkBalance = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter an XRP address');
      return;
    }

    if (!xrplService.isValidAddress(address.trim())) {
      Alert.alert('Error', 'Please enter a valid XRP address');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Checking balance for address:', address);
      
      const info = await xrplService.validateAndGetAccountInfo(address.trim());
      setAccountInfo(info);
      console.log('Balance check completed:', info);
    } catch (error) {
      console.error('Error checking balance:', error);
      Alert.alert('Error', 'Failed to check balance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setAddress('');
    setAccountInfo(null);
  };

  const handleQRScan = (scannedData: string) => {
    console.log('QR scanned in BalanceChecker:', scannedData);
    setAddress(scannedData);
    setShowQRScanner(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.currentBackground,
    },
    content: {
      padding: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      gap: 12,
    },
    inputContainer: {
      backgroundColor: colors.currentCard,
      borderRadius: 12,
      padding: 20,
      marginVertical: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
      marginBottom: 15,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 15,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    input: {
      ...commonStyles.input,
      flex: 1,
      backgroundColor: colors.currentBackground,
      borderColor: colors.currentTextSecondary,
      color: colors.currentText,
    },
    qrButton: {
      backgroundColor: colors.currentSecondary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkButton: {
      backgroundColor: colors.currentPrimary,
      ...commonStyles.button,
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checkButtonText: {
      color: colors.currentCard,
      fontSize: 16,
      fontWeight: 'bold',
    },
    clearButton: {
      backgroundColor: colors.currentTextSecondary,
      ...commonStyles.button,
      marginTop: 10,
    },
    clearButtonText: {
      color: colors.currentCard,
      fontWeight: '600',
    },
    resultCard: {
      backgroundColor: colors.currentCard,
      borderRadius: 12,
      padding: 20,
      marginVertical: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    resultText: {
      fontSize: 16,
      color: colors.currentText,
      marginVertical: 5,
    },
    balanceText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.currentPrimary,
      textAlign: 'center',
      marginVertical: 10,
    },
    statusText: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 10,
    },
    existsText: {
      color: '#4CAF50',
    },
    notExistsText: {
      color: colors.currentHighlight,
    },
    addressText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      fontFamily: 'monospace',
      textAlign: 'center',
      marginBottom: 10,
    },
    loadingContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    loadingText: {
      color: colors.currentText,
      marginTop: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <XRPLogo size={40} color={colors.currentPrimary} />
          <View>
            <Text style={[commonStyles.title, { color: colors.currentText }]}>
              Balance Checker
            </Text>
            <Text style={[commonStyles.subtitle, { color: colors.currentTextSecondary }]}>
              Check XRP account balance and status
            </Text>
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <View style={styles.sectionTitleContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.currentPrimary} />
            <Text style={styles.sectionTitle}>Enter XRP Address</Text>
          </View>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              placeholderTextColor={colors.currentTextSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setShowQRScanner(true)}
            >
              <IconSymbol name="qrcode.viewfinder" size={24} color={colors.currentCard} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.checkButton}
            onPress={checkBalance}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.currentCard} />
            ) : (
              <>
                <XRPLogo size={20} color={colors.currentCard} />
                <Text style={styles.checkButtonText}>Check Balance</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Loading */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.currentPrimary} />
            <Text style={styles.loadingText}>Checking account on XRPL...</Text>
          </View>
        )}

        {/* Results */}
        {accountInfo && !isLoading && (
          <View style={styles.resultCard}>
            <View style={styles.sectionTitleContainer}>
              <XRPLogo size={20} color={colors.currentPrimary} />
              <Text style={styles.sectionTitle}>Account Information</Text>
            </View>
            
            <Text style={styles.addressText}>{accountInfo.address}</Text>
            
            {accountInfo.exists ? (
              <View>
                <Text style={[styles.statusText, styles.existsText]}>
                  ✅ Account Active
                </Text>
                <Text style={styles.balanceText}>
                  {accountInfo.balance} XRP
                </Text>
                <Text style={styles.resultText}>
                  Sequence Number: {accountInfo.sequence}
                </Text>
                <Text style={styles.resultText}>
                  Reserve Requirement: {accountInfo.reserve} XRP
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[styles.statusText, styles.notExistsText]}>
                  ⏳ Account Not Funded
                </Text>
                <Text style={styles.resultText}>
                  This account has not been activated yet. Send at least {accountInfo.reserve} XRP to activate it.
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearResults}
            >
              <Text style={styles.clearButtonText}>Check Another Address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* QR Scanner */}
        <QRScanner
          visible={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          onScan={handleQRScan}
        />

        <BrandFooter />
      </View>
    </ScrollView>
  );
}
