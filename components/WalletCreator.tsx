
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { IconSymbol } from '@/components/IconSymbol';
import { useAppTheme } from '@/contexts/ThemeContext';
import { commonStyles } from '@/styles/commonStyles';
import { XRPWallet, xrplService, AccountInfo } from '@/utils/xrplUtils';
import BrandFooter from '@/components/BrandFooter';
import XRPLogo from '@/components/XRPLogo';

interface WalletCreatorProps {
  onWalletCreated?: (wallet: XRPWallet) => void;
}

export default function WalletCreator({ onWalletCreated }: WalletCreatorProps) {
  const { colors } = useAppTheme();
  const [wallet, setWallet] = useState<XRPWallet | null>(null);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSeedWarning, setShowSeedWarning] = useState(false);
  const [seedRevealed, setSeedRevealed] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const createWallet = async () => {
    try {
      setIsLoading(true);
      console.log('Creating new XRP wallet...');
      
      const newWallet = xrplService.generateWallet();
      setWallet(newWallet);
      
      // Validate the wallet on XRPL
      setIsValidating(true);
      const info = await xrplService.validateAndGetAccountInfo(newWallet.address);
      setAccountInfo(info);
      setIsValidating(false);
      
      onWalletCreated?.(newWallet);
      console.log('Wallet created successfully');
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied!', `${type} copied to clipboard`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const showSeedWithWarning = () => {
    setShowSeedWarning(true);
  };

  const confirmShowSeed = () => {
    setSeedRevealed(true);
    setShowSeedWarning(false);
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
    createButton: {
      backgroundColor: colors.currentPrimary,
      ...commonStyles.button,
      marginVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    createButtonText: {
      color: colors.currentCard,
      fontSize: 18,
      fontWeight: 'bold',
    },
    walletCard: {
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
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
    },
    addressText: {
      fontSize: 14,
      color: colors.currentText,
      fontFamily: 'monospace',
      backgroundColor: colors.currentBackground,
      padding: 10,
      borderRadius: 8,
      marginVertical: 5,
    },
    seedContainer: {
      backgroundColor: colors.currentBackground,
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
    },
    seedText: {
      fontSize: 14,
      color: colors.currentText,
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    hiddenSeed: {
      fontSize: 14,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      fontStyle: 'italic',
    },
    copyButton: {
      backgroundColor: colors.currentSecondary,
      ...commonStyles.button,
      marginTop: 10,
    },
    copyButtonText: {
      color: colors.currentCard,
      fontWeight: '600',
    },
    revealButton: {
      backgroundColor: colors.currentHighlight,
      ...commonStyles.button,
      marginTop: 10,
    },
    revealButtonText: {
      color: colors.currentCard,
      fontWeight: '600',
    },
    qrContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    statusContainer: {
      backgroundColor: colors.currentBackground,
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
    },
    statusText: {
      fontSize: 14,
      color: colors.currentText,
      textAlign: 'center',
    },
    warningText: {
      fontSize: 12,
      color: colors.currentHighlight,
      textAlign: 'center',
      marginTop: 10,
      fontStyle: 'italic',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.currentCard,
      padding: 30,
      borderRadius: 12,
      margin: 20,
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.currentText,
      textAlign: 'center',
      marginBottom: 15,
    },
    modalText: {
      fontSize: 16,
      color: colors.currentText,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalButton: {
      ...commonStyles.button,
      flex: 1,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: colors.currentTextSecondary,
    },
    confirmButton: {
      backgroundColor: colors.currentHighlight,
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
              XRP Wallet Creator
            </Text>
            <Text style={[commonStyles.subtitle, { color: colors.currentTextSecondary }]}>
              Generate a new XRP wallet on the XRPL network
            </Text>
          </View>
        </View>

        {!wallet ? (
          <TouchableOpacity
            style={styles.createButton}
            onPress={createWallet}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.currentCard} />
            ) : (
              <>
                <XRPLogo size={24} color={colors.currentCard} />
                <Text style={styles.createButtonText}>Create New Wallet</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View>
            {/* Wallet Address */}
            <View style={styles.walletCard}>
              <View style={styles.sectionTitleContainer}>
                <IconSymbol name="location.fill" size={20} color={colors.currentPrimary} />
                <Text style={styles.sectionTitle}>Wallet Address</Text>
              </View>
              <Text style={styles.addressText}>{wallet.address}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(wallet.address, 'Address')}
              >
                <Text style={styles.copyButtonText}>Copy Address</Text>
              </TouchableOpacity>
            </View>

            {/* QR Code */}
            <View style={styles.walletCard}>
              <View style={styles.sectionTitleContainer}>
                <IconSymbol name="qrcode" size={20} color={colors.currentPrimary} />
                <Text style={styles.sectionTitle}>QR Code</Text>
              </View>
              <View style={styles.qrContainer}>
                <QRCode
                  value={wallet.address}
                  size={200}
                  backgroundColor={colors.currentCard}
                  color={colors.currentText}
                  logo={require('@/assets/images/final_quest_240x240.png')}
                  logoSize={40}
                  logoBackgroundColor={colors.currentCard}
                />
              </View>
            </View>

            {/* Seed Phrase */}
            <View style={styles.walletCard}>
              <View style={styles.sectionTitleContainer}>
                <IconSymbol name="key.fill" size={20} color={colors.currentHighlight} />
                <Text style={styles.sectionTitle}>Seed Phrase</Text>
              </View>
              <View style={styles.seedContainer}>
                {seedRevealed ? (
                  <Text style={styles.seedText}>{wallet.seed}</Text>
                ) : (
                  <Text style={styles.hiddenSeed}>
                    ••••••••••••••••••••••••••••••••
                  </Text>
                )}
              </View>
              
              {!seedRevealed ? (
                <TouchableOpacity
                  style={styles.revealButton}
                  onPress={showSeedWithWarning}
                >
                  <Text style={styles.revealButtonText}>Reveal Seed</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(wallet.seed, 'Seed')}
                >
                  <Text style={styles.copyButtonText}>Copy Seed</Text>
                </TouchableOpacity>
              )}
              
              <Text style={styles.warningText}>
                ⚠️ Keep your seed phrase safe! Anyone with access to it can control your wallet.
              </Text>
            </View>

            {/* Account Status */}
            <View style={styles.walletCard}>
              <View style={styles.sectionTitleContainer}>
                <XRPLogo size={20} color={colors.currentPrimary} />
                <Text style={styles.sectionTitle}>Account Status</Text>
              </View>
              {isValidating ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color={colors.currentPrimary} />
                  <Text style={styles.loadingText}>Validating on XRPL...</Text>
                </View>
              ) : accountInfo ? (
                <View style={styles.statusContainer}>
                  {accountInfo.exists ? (
                    <View>
                      <Text style={styles.statusText}>
                        ✅ Account exists on XRPL
                      </Text>
                      <Text style={styles.statusText}>
                        Balance: {accountInfo.balance} XRP
                      </Text>
                      <Text style={styles.statusText}>
                        Sequence: {accountInfo.sequence}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.statusText}>
                        ⏳ Account not yet funded
                      </Text>
                      <Text style={styles.statusText}>
                        Send at least {accountInfo.reserve} XRP to activate this account
                      </Text>
                    </View>
                  )}
                </View>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={createWallet}
              disabled={isLoading}
            >
              <XRPLogo size={24} color={colors.currentCard} />
              <Text style={styles.createButtonText}>Create Another Wallet</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Seed Warning Modal */}
        <Modal
          visible={showSeedWarning}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSeedWarning(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>⚠️ Security Warning</Text>
              <Text style={styles.modalText}>
                Your seed phrase is the master key to your wallet. Anyone who has access to it can control your funds.
                {'\n\n'}
                • Never share it with anyone
                • Store it in a secure location
                • Write it down offline
                • Don't take screenshots
                {'\n\n'}
                Are you sure you want to reveal it?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowSeedWarning(false)}
                >
                  <Text style={[commonStyles.buttonText, { color: colors.currentCard }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmShowSeed}
                >
                  <Text style={[commonStyles.buttonText, { color: colors.currentCard }]}>
                    I Understand
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <BrandFooter />
      </View>
    </ScrollView>
  );
}
