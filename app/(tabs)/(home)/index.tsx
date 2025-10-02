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
      <Text style={[styles.brandText, { color: colors.currentText }]}>
        XRP WALLET
      </Text>
      <Text style={[styles.brandSubtext, { color: colors.currentTextSecondary }]}>
        made by Boki zg
      </Text>
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
        
        {/* Tab Navigation */}
        <View style={[styles.tabContainer, { backgroundColor: colors.currentCard }]}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'create' && { backgroundColor: colors.currentPrimary }
            ]}
            onPress={() => setActiveTab('create')}
          >
            <IconSymbol 
              name="plus.circle.fill" 
              size={20} 
              color={activeTab === 'create' ? colors.currentCard : colors.currentText} 
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
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandSubtext: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  headerButtonContainer: {
    padding: 8,
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
