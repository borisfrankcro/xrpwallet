
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

export default function BalanceChecker() {
  const { colors } = useAppTheme();
  const [address, setAddress] = useState('');
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setError(null);
      console.log('Checking balance for address:', address.trim());
      
      const info = await xrplService.validateAndGetAccountInfo(address.trim());
      setAccountInfo(info);
      console.log('Balance check completed:', info);
    } catch (error: any) {
      console.error('Error checking balance:', error);
      setError(error.message || 'Failed to check balance');
      Alert.alert('Error', 'Failed to check balance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setAddress('');
    setAccountInfo(null);
    setError(null);
  };

  const handleQRScan = (scannedData: string) => {
    console.log('QR scanned in BalanceChecker:', scannedData);
    setAddress(scannedData.trim());
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
    inputContainer: {
      marginVertical: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.currentText,
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    input: {
      ...commonStyles.input,
      backgroundColor: colors.currentCard,
      borderColor: colors.currentTextSecondary,
      color: colors.currentText,
      fontFamily: 'monospace',
    },
    qrButton: {
      backgroundColor: colors.currentPrimary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 20,
    },
    checkButton: {
      backgroundColor: colors.currentPrimary,
      ...commonStyles.button,
      flex: 1,
    },
    clearButton: {
      backgroundColor: colors.currentTextSecondary,
      ...commonStyles.button,
      flex: 1,
    },
    buttonText: {
      color: colors.currentCard,
      fontSize: 16,
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
    resultTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
      marginBottom: 15,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.currentBackground,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.currentTextSecondary,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 14,
      color: colors.currentText,
      fontWeight: '600',
      flex: 1,
      textAlign: 'right',
      fontFamily: 'monospace',
    },
    statusContainer: {
      backgroundColor: colors.currentBackground,
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
    },
    statusText: {
      fontSize: 16,
      color: colors.currentText,
      textAlign: 'center',
      fontWeight: '600',
    },
    balanceContainer: {
      backgroundColor: colors.currentPrimary,
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
      marginVertical: 10,
    },
    balanceLabel: {
      fontSize: 14,
      color: colors.currentCard,
      marginBottom: 5,
    },
    balanceValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.currentCard,
    },
    balanceUnit: {
      fontSize: 18,
      color: colors.currentCard,
      marginTop: 5,
    },
    loadingContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    loadingText: {
      color: colors.currentText,
      marginTop: 10,
    },
    errorContainer: {
      backgroundColor: colors.currentHighlight,
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
    },
    errorText: {
      color: colors.currentCard,
      textAlign: 'center',
      fontWeight: '600',
    },
    addressText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      fontFamily: 'monospace',
      textAlign: 'center',
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={[commonStyles.title, { color: colors.currentText }]}>
          Balance Checker
        </Text>
        <Text style={[commonStyles.subtitle, { color: colors.currentTextSecondary }]}>
          Check the balance of any XRP address
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>XRP Address</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter XRP address (e.g., rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH)"
              placeholderTextColor={colors.currentTextSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setShowQRScanner(true)}
            >
              <IconSymbol name="qrcode" size={24} color={colors.currentCard} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={checkBalance}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.currentCard} />
            ) : (
              <Text style={styles.buttonText}>Check Balance</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearResults}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.currentPrimary} />
            <Text style={styles.loadingText}>Checking balance...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {error}</Text>
          </View>
        )}

        {accountInfo && !isLoading && (
          <View>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Account Information</Text>
              <Text style={styles.addressText}>{accountInfo.address}</Text>
              
              {accountInfo.exists ? (
                <View>
                  <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <Text style={styles.balanceValue}>{accountInfo.balance}</Text>
                    <Text style={styles.balanceUnit}>XRP</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={[styles.infoValue, { color: colors.currentSecondary }]}>
                      ✅ Active
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Sequence</Text>
                    <Text style={styles.infoValue}>{accountInfo.sequence}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Reserve</Text>
                    <Text style={styles.infoValue}>{accountInfo.reserve} XRP</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Available</Text>
                    <Text style={styles.infoValue}>
                      {Math.max(0, parseFloat(accountInfo.balance) - parseFloat(accountInfo.reserve)).toFixed(6)} XRP
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>⏳ Account Not Funded</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={[styles.infoValue, { color: colors.currentHighlight }]}>
                      Not Active
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Required to Activate</Text>
                    <Text style={styles.infoValue}>{accountInfo.reserve} XRP</Text>
                  </View>

                  <Text style={[commonStyles.textSecondary, { 
                    color: colors.currentTextSecondary, 
                    textAlign: 'center',
                    marginTop: 15,
                    lineHeight: 20,
                  }]}>
                    This account needs to receive at least {accountInfo.reserve} XRP to be activated on the XRPL network.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* QR Scanner Modal */}
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
