
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof colors & {
    currentBackground: string;
    currentText: string;
    currentTextSecondary: string;
    currentPrimary: string;
    currentSecondary: string;
    currentAccent: string;
    currentCard: string;
    currentHighlight: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeColors = {
    ...colors,
    currentBackground: isDark ? colors.backgroundDark : colors.background,
    currentText: isDark ? colors.textDark : colors.text,
    currentTextSecondary: isDark ? colors.textSecondaryDark : colors.textSecondary,
    currentPrimary: isDark ? colors.primaryDark : colors.primary,
    currentSecondary: isDark ? colors.secondaryDark : colors.secondary,
    currentAccent: isDark ? colors.accentDark : colors.accent,
    currentCard: isDark ? colors.cardDark : colors.card,
    currentHighlight: isDark ? colors.highlightDark : colors.highlight,
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
