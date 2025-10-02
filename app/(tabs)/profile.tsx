
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Linking } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useAppTheme } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles } from "@/styles/commonStyles";
import XRPLogo from "@/components/XRPLogo";

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const theme = useTheme();

  const openSupport = () => {
    const email = 'support@xrpwallet.com';
    const subject = 'XRP Wallet Support Request';
    const body = 'Hello, I need help with...';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch((err) => {
      console.error('Failed to open email client:', err);
    });
  };

  const openXRPLedger = () => {
    Linking.openURL('https://xrpl.org/').catch((err) => {
      console.error('Failed to open XRPL website:', err);
    });
  };

  const openRipple = () => {
    Linking.openURL('https://ripple.com/').catch((err) => {
      console.error('Failed to open Ripple website:', err);
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.currentBackground,
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    headerSection: {
      backgroundColor: colors.currentCard,
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    logoContainer: {
      marginBottom: 16,
    },
    appTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.currentText,
      textAlign: 'center',
      letterSpacing: 1,
    },
    appSubtitle: {
      fontSize: 14,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      marginTop: 4,
      fontStyle: 'italic',
    },
    appDescription: {
      fontSize: 14,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 20,
      opacity: 0.8,
    },
    section: {
      backgroundColor: colors.currentCard,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 4,
      borderRadius: 8,
    },
    menuItemText: {
      fontSize: 16,
      color: colors.currentText,
      marginLeft: 12,
      flex: 1,
    },
    menuItemDescription: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      marginLeft: 12,
      marginTop: 2,
      opacity: 0.8,
    },
    themeToggle: {
      backgroundColor: colors.currentBackground,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    themeToggleText: {
      fontSize: 14,
      color: colors.currentText,
      textAlign: 'center',
      fontWeight: '600',
    },
    linkItem: {
      backgroundColor: colors.currentBackground,
      borderRadius: 8,
      padding: 12,
      marginVertical: 4,
    },
    linkText: {
      fontSize: 14,
      color: colors.currentPrimary,
      fontWeight: '600',
    },
    linkDescription: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      marginTop: 2,
      opacity: 0.8,
    },
    versionText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      marginTop: 20,
      opacity: 0.6,
    },
    xrpBranding: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 16,
      padding: 12,
      backgroundColor: colors.currentBackground,
      borderRadius: 8,
    },
    xrpBrandingText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <XRPLogo size={80} color={colors.currentPrimary} variant="gradient" />
            </View>
            <Text style={styles.appTitle}>XRP WALLET</Text>
            <Text style={styles.appSubtitle}>made by Boki zg</Text>
            <Text style={styles.appDescription}>
              Professional XRP wallet management for the XRPL network. 
              Secure, simple, and ready for commercial use.
            </Text>
            
            <View style={styles.xrpBranding}>
              <XRPLogo size={20} color={colors.currentPrimary} variant="outline" />
              <Text style={styles.xrpBrandingText}>Powered by XRPL</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <IconSymbol name="gearshape.fill" size={20} color={colors.currentPrimary} />
              <Text style={styles.sectionTitle}>Settings</Text>
            </View>
            
            <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
              <IconSymbol 
                name={isDark ? "sun.max.fill" : "moon.fill"} 
                size={24} 
                color={colors.currentText} 
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemText}>
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </Text>
                <Text style={styles.menuItemDescription}>
                  Switch to {isDark ? 'light' : 'dark'} theme
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.currentTextSecondary} />
            </TouchableOpacity>
          </View>

          {/* XRP Resources Section */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <XRPLogo size={20} color={colors.currentPrimary} />
              <Text style={styles.sectionTitle}>XRP Resources</Text>
            </View>
            
            <TouchableOpacity style={styles.linkItem} onPress={openXRPLedger}>
              <Text style={styles.linkText}>XRPL.org - Official Documentation</Text>
              <Text style={styles.linkDescription}>
                Learn more about the XRP Ledger blockchain
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkItem} onPress={openRipple}>
              <Text style={styles.linkText}>Ripple.com - Company Website</Text>
              <Text style={styles.linkDescription}>
                Official Ripple company information and news
              </Text>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <IconSymbol name="questionmark.circle.fill" size={20} color={colors.currentPrimary} />
              <Text style={styles.sectionTitle}>Support</Text>
            </View>
            
            <TouchableOpacity style={styles.menuItem} onPress={openSupport}>
              <IconSymbol name="envelope.fill" size={24} color={colors.currentText} />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemText}>Contact Support</Text>
                <Text style={styles.menuItemDescription}>
                  Get help with your XRP wallet
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.currentTextSecondary} />
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <IconSymbol name="info.circle.fill" size={20} color={colors.currentPrimary} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            
            <View style={styles.menuItem}>
              <IconSymbol name="app.badge.fill" size={24} color={colors.currentText} />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemText}>Version</Text>
                <Text style={styles.menuItemDescription}>1.0.0</Text>
              </View>
            </View>
            
            <View style={styles.menuItem}>
              <XRPLogo size={24} color={colors.currentPrimary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuItemText}>XRP Network</Text>
                <Text style={styles.menuItemDescription}>XRPL Testnet</Text>
              </View>
            </View>
          </View>

          <Text style={styles.versionText}>
            XRP Wallet v1.0.0 - Professional Edition
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
