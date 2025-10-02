
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
      borderRadius: 12,
      padding: 16,
      margin: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
    },
    refreshButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.currentBackground,
    },
    priceContainer: {
      alignItems: 'center',
      marginVertical: 8,
    },
    priceText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.currentText,
      fontFamily: 'monospace',
    },
    currencyText: {
      fontSize: 16,
      color: colors.currentTextSecondary,
      marginLeft: 4,
    },
    changeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    changeText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 4,
    },
    lastUpdated: {
      fontSize: 12,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      marginTop: 8,
    },
    loadingContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    loadingText: {
      color: colors.currentTextSecondary,
      marginTop: 8,
    },
    errorContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    errorText: {
      color: colors.currentHighlight,
      textAlign: 'center',
      marginBottom: 12,
    },
    retryButton: {
      backgroundColor: colors.currentPrimary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    retryButtonText: {
      color: colors.currentCard,
      fontWeight: '600',
    },
  });

  if (error && !priceData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <XRPLogo size={24} color={colors.currentText} />
            <Text style={styles.title}>XRP Price</Text>
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchXRPPrice}>
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
          <XRPLogo size={24} color={colors.currentText} />
          <Text style={styles.title}>XRP Price</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchXRPPrice}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.currentPrimary} />
          ) : (
            <IconSymbol name="arrow.clockwise" size={20} color={colors.currentText} />
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
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={styles.priceText}>${formatPrice(priceData.price)}</Text>
              <Text style={styles.currencyText}>USD</Text>
            </View>
          </View>

          <View style={styles.changeContainer}>
            <IconSymbol
              name={priceData.change24h >= 0 ? "arrow.up.right" : "arrow.down.right"}
              size={16}
              color={getChangeColor(priceData.change24h)}
            />
            <Text style={[styles.changeText, { color: getChangeColor(priceData.change24h) }]}>
              {formatChange(priceData.change24h)}
            </Text>
            <Text style={[styles.currencyText, { marginLeft: 4 }]}>24h</Text>
          </View>

          <Text style={styles.lastUpdated}>
            Last updated: {priceData.lastUpdated}
          </Text>
        </>
      ) : null}
    </View>
  );
}
