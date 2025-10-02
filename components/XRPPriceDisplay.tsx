
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import XRPLogo from '@/components/XRPLogo';

interface PriceData {
  price: number;
  change24h: number;
  lastUpdated: string;
}

export default function XRPPriceDisplay() {
  const { colors } = useAppTheme();
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchXRPPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching XRP price from CoinGecko API...');

      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Price data received:', data);

      if (data.ripple) {
        const priceInfo: PriceData = {
          price: data.ripple.usd,
          change24h: data.ripple.usd_24h_change || 0,
          lastUpdated: new Date().toLocaleTimeString(),
        };
        setPriceData(priceInfo);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching XRP price:', error);
      setError('Failed to fetch price data');
      Alert.alert('Error', 'Failed to fetch XRP price. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchXRPPrice();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchXRPPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number): string => {
    return price.toFixed(4);
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number): string => {
    if (change > 0) return '#4CAF50'; // Green for positive
    if (change < 0) return '#F44336'; // Red for negative
    return colors.currentTextSecondary; // Neutral for zero
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.currentCard,
      borderRadius: 16,
      padding: 20,
      margin: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    logoContainer: {
      padding: 4,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.currentText,
      letterSpacing: 0.5,
    },
    subtitleText: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      opacity: 0.8,
    },
    refreshButton: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.currentBackground,
    },
    priceContainer: {
      alignItems: 'center',
      marginVertical: 12,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 8,
    },
    priceText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.currentText,
      fontFamily: 'monospace',
    },
    currencyText: {
      fontSize: 18,
      color: colors.currentTextSecondary,
      fontWeight: '600',
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: colors.currentBackground,
    },
    changeText: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 6,
    },
    changeLabel: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      marginLeft: 6,
      opacity: 0.8,
    },
    lastUpdated: {
      fontSize: 11,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      marginTop: 12,
      opacity: 0.7,
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    loadingText: {
      color: colors.currentTextSecondary,
      marginTop: 12,
      fontSize: 14,
    },
    errorContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    errorText: {
      color: colors.currentHighlight,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: 14,
    },
    retryButton: {
      backgroundColor: colors.currentPrimary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    retryButtonText: {
      color: colors.currentCard,
      fontWeight: '600',
      fontSize: 14,
    },
  });

  if (error && !priceData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <XRPLogo size={32} color={colors.currentPrimary} variant="gradient" />
            </View>
            <View>
              <Text style={styles.titleText}>XRP Price</Text>
              <Text style={styles.subtitleText}>Live Market Data</Text>
            </View>
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchXRPPrice}>
            <XRPLogo size={16} color={colors.currentCard} />
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <XRPLogo size={32} color={colors.currentPrimary} variant="gradient" />
          </View>
          <View>
            <Text style={styles.titleText}>XRP Price</Text>
            <Text style={styles.subtitleText}>Live Market Data</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchXRPPrice}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.currentPrimary} />
          ) : (
            <IconSymbol name="arrow.clockwise" size={22} color={colors.currentText} />
          )}
        </TouchableOpacity>
      </View>

      {isLoading && !priceData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.currentPrimary} />
          <Text style={styles.loadingText}>Loading price data...</Text>
        </View>
      ) : priceData ? (
        <>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>${formatPrice(priceData.price)}</Text>
              <Text style={styles.currencyText}>USD</Text>
            </View>
          </View>

          <View style={styles.changeContainer}>
            <IconSymbol
              name={priceData.change24h >= 0 ? "arrow.up.right" : "arrow.down.right"}
              size={18}
              color={getChangeColor(priceData.change24h)}
            />
            <Text style={[styles.changeText, { color: getChangeColor(priceData.change24h) }]}>
              {formatChange(priceData.change24h)}
            </Text>
            <Text style={styles.changeLabel}>24h</Text>
          </View>

          <Text style={styles.lastUpdated}>
            Last updated: {priceData.lastUpdated}
          </Text>
        </>
      ) : null}
    </View>
  );
}
