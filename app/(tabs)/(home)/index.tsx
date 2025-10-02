
import React, { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "@/contexts/ThemeContext";
import { commonStyles } from "@/styles/commonStyles";
import WalletCreator from "@/components/WalletCreator";
import BalanceChecker from "@/components/BalanceChecker";
import QRScanner from "@/components/QRScanner";
import OnboardingModal from "@/components/OnboardingModal";
import XRPPriceDisplay from "@/components/XRPPriceDisplay";
import XRPLogo from "@/components/XRPLogo";

export default function HomeScreen() {
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = useAppTheme();
  const [activeTab, setActiveTab] = useState<'create' | 'balance'>('create');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleQRScan = (data: string) => {
    console.log('QR scanned:', data);
    // If we're on the balance tab, set the scanned address
    if (activeTab === 'balance') {
      // This would need to be passed to BalanceChecker component
      // For now, we'll just show an alert
      alert(`Scanned address: ${data}`);
    }
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={toggleTheme}
      style={styles.headerButtonContainer}
    >
      <IconSymbol 
        name={isDark ? "sun.max.fill" : "moon.fill"} 
        color={colors.currentText} 
        size={24}
      />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <View style={styles.brandContainer}>
      <View style={styles.brandHeader}>
        <XRPLogo size={32} color={colors.currentPrimary} variant="gradient" />
        <View style={styles.brandTextContainer}>
          <Text style={[styles.brandText, { color: colors.currentText }]}>
            XRP WALLET
          </Text>
          <Text style={[styles.brandSubtext, { color: colors.currentTextSecondary }]}>
            made by Boki zg
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
            headerStyle: {
              backgroundColor: colors.currentBackground,
            },
            headerTintColor: colors.currentText,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.currentBackground }]}>
        {Platform.OS !== 'ios' && (
          <View style={[styles.header, { backgroundColor: colors.currentBackground }]}>
            {renderHeaderLeft()}
            {renderHeaderRight()}
          </View>
        )}
        
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Hero Section with XRP Branding */}
          <View style={[styles.heroSection, { backgroundColor: colors.currentCard }]}>
            <View style={styles.heroContent}>
              <XRPLogo size={80} color={colors.currentPrimary} variant="gradient" />
              <Text style={[styles.heroTitle, { color: colors.currentText }]}>
                XRP WALLET
              </Text>
              <Text style={[styles.heroSubtitle, { color: colors.currentTextSecondary }]}>
                Secure • Professional • Easy to Use
              </Text>
              <Text style={[styles.heroDescription, { color: colors.currentTextSecondary }]}>
                Create and manage XRP wallets on the XRPL network with confidence
              </Text>
            </View>
          </View>

          {/* XRP Price Display */}
          <XRPPriceDisplay />
          
          {/* Tab Navigation */}
          <View style={[styles.tabContainer, { backgroundColor: colors.currentCard }]}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'create' && { backgroundColor: colors.currentPrimary }
              ]}
              onPress={() => setActiveTab('create')}
            >
              <XRPLogo 
                size={20} 
                color={activeTab === 'create' ? colors.currentCard : colors.currentPrimary} 
                variant="outline"
              />
              <Text style={[
                styles.tabText,
                { color: activeTab === 'create' ? colors.currentCard : colors.currentText }
              ]}>
                Create Wallet
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'balance' && { backgroundColor: colors.currentPrimary }
              ]}
              onPress={() => setActiveTab('balance')}
            >
              <IconSymbol 
                name="magnifyingglass.circle.fill" 
                size={20} 
                color={activeTab === 'balance' ? colors.currentCard : colors.currentText} 
              />
              <Text style={[
                styles.tabText,
                { color: activeTab === 'balance' ? colors.currentCard : colors.currentText }
              ]}>
                Check Balance
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {activeTab === 'create' ? (
              <WalletCreator />
            ) : (
              <BalanceChecker />
            )}
          </View>
        </ScrollView>

        {/* QR Scanner Modal */}
        <QRScanner
          visible={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          onScan={handleQRScan}
        />

        {/* Onboarding Modal */}
        <OnboardingModal
          visible={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 10,
  },
  brandContainer: {
    flex: 1,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTextContainer: {
    flex: 1,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  brandSubtext: {
    fontSize: 11,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  headerButtonContainer: {
    padding: 8,
  },
  heroSection: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  heroContent: {
    alignItems: 'center',
    gap: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.9,
  },
  heroDescription: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
    opacity: 0.7,
    maxWidth: 280,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
