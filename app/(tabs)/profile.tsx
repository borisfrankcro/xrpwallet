import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "@/contexts/ThemeContext";
import { commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const theme = useTheme();
  const { colors, isDark, toggleTheme } = useAppTheme();

  const openSupport = () => {
    // You can replace this with your actual support link
    Linking.openURL('mailto:support@xrpwallet.com?subject=XRP Wallet Support');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.currentBackground }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        {/* App Header */}
        <GlassView style={[
          styles.profileHeader,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <View style={[styles.appIcon, { backgroundColor: colors.currentPrimary }]}>
            <IconSymbol name="bitcoinsign.circle.fill" size={40} color={colors.currentCard} />
          </View>
          <Text style={[styles.name, { color: colors.currentText }]}>XRP WALLET</Text>
          <Text style={[styles.email, { color: colors.currentTextSecondary }]}>Professional XRP Wallet for XRPL</Text>
        </GlassView>

        {/* Settings Section */}
        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: colors.currentText }]}>Settings</Text>
          
          <View style={styles.infoRow}>
            <IconSymbol name={isDark ? "moon.fill" : "sun.max.fill"} size={20} color={colors.currentTextSecondary} />
            <Text style={[styles.infoText, { color: colors.currentText }]}>Theme</Text>
            <TouchableOpacity style={[styles.themeButton, { backgroundColor: colors.currentPrimary }]} onPress={toggleTheme}>
              <Text style={[styles.themeButtonText, { color: colors.currentCard }]}>
                {isDark ? 'Dark' : 'Light'}
              </Text>
            </TouchableOpacity>
          </View>
        </GlassView>

        {/* About Section */}
        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: colors.currentText }]}>About</Text>
          
          <Text style={[styles.aboutText, { color: colors.currentTextSecondary }]}>
            XRP WALLET is a secure, professional wallet application for creating and managing XRP wallets on the XRPL network.
          </Text>
          
          <View style={styles.infoRow}>
            <IconSymbol name="shield.checkered" size={20} color={colors.currentTextSecondary} />
            <Text style={[styles.infoText, { color: colors.currentText }]}>Secure & Professional</Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="network" size={20} color={colors.currentTextSecondary} />
            <Text style={[styles.infoText, { color: colors.currentText }]}>XRPL Network</Text>
          </View>

          <TouchableOpacity style={[styles.supportButton, { backgroundColor: colors.currentSecondary }]} onPress={openSupport}>
            <Text style={[styles.supportButtonText, { color: colors.currentCard }]}>Contact Support</Text>
          </TouchableOpacity>
        </GlassView>

        {/* Security Notice */}
        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: colors.currentText }]}>Security Notice</Text>
          
          <View style={styles.infoRow}>
            <IconSymbol name="lock.fill" size={20} color={colors.currentHighlight} />
            <Text style={[styles.securityText, { color: colors.currentTextSecondary }]}>
              Your seed phrases are never stored on our servers
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.currentHighlight} />
            <Text style={[styles.securityText, { color: colors.currentTextSecondary }]}>
              Always verify addresses before transactions
            </Text>
          </View>
        </GlassView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.currentTextSecondary }]}>
            XRP WALLET — made by Boki zg
          </Text>
          <Text style={[styles.footerText, { color: colors.currentTextSecondary }]}>
            Built with React Native & Expo
          </Text>
          <Text style={[styles.version, { color: colors.currentTextSecondary }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  profileHeader: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    gap: 12,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    borderRadius: 12,
    padding: 20,
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  securityText: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  supportButton: {
    ...commonStyles.button,
    marginTop: 12,
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  version: {
    fontSize: 12,
    marginTop: 8,
  },
});
