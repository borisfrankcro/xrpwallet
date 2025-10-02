
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAppTheme } from '@/contexts/ThemeContext';
import { commonStyles } from '@/styles/commonStyles';

interface OnboardingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ visible, onClose }: OnboardingModalProps) {
  const { colors } = useAppTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: 'bitcoinsign.circle.fill',
      title: 'Welcome to XRP WALLET',
      description: 'A secure and professional wallet for the XRP Ledger (XRPL) network. Create wallets, check balances, and manage your XRP safely.',
    },
    {
      icon: 'key.fill',
      title: 'What is a Seed Phrase?',
      description: 'A seed phrase is a series of words that acts as the master key to your wallet. It allows you to recover your wallet if you lose access to your device.',
    },
    {
      icon: 'shield.checkered',
      title: 'How to Keep Your Seed Safe',
      description: '• Write it down on paper and store it securely\n• Never share it with anyone\n• Don\'t store it digitally\n• Keep multiple copies in different safe locations',
    },
    {
      icon: 'network',
      title: 'XRPL Network',
      description: 'This app connects to the XRP Ledger testnet for safe testing. Always verify you\'re on the correct network before making transactions.',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    onClose();
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.currentCard,
      borderRadius: 20,
      margin: 20,
      maxWidth: 400,
      width: '90%',
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.currentBackground,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currentText,
    },
    skipButton: {
      padding: 5,
    },
    skipText: {
      color: colors.currentTextSecondary,
      fontSize: 16,
    },
    content: {
      padding: 30,
      alignItems: 'center',
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.currentPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.currentText,
      textAlign: 'center',
      marginBottom: 16,
    },
    stepDescription: {
      fontSize: 16,
      color: colors.currentTextSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 30,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
      gap: 8,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.currentTextSecondary,
    },
    progressDotActive: {
      backgroundColor: colors.currentPrimary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      gap: 15,
    },
    button: {
      ...commonStyles.button,
      flex: 1,
    },
    backButton: {
      backgroundColor: colors.currentTextSecondary,
    },
    nextButton: {
      backgroundColor: colors.currentPrimary,
    },
    buttonText: {
      color: colors.currentCard,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const currentStepData = steps[currentStep];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Getting Started</Text>
            <TouchableOpacity style={styles.skipButton} onPress={skip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.iconContainer}>
              <IconSymbol 
                name={currentStepData.icon} 
                size={40} 
                color={colors.currentCard} 
              />
            </View>

            <Text style={styles.stepTitle}>{currentStepData.title}</Text>
            <Text style={styles.stepDescription}>{currentStepData.description}</Text>

            <View style={styles.progressContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    index === currentStep && styles.progressDotActive,
                  ]}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={prevStep}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.button, styles.nextButton]}
              onPress={nextStep}
            >
              <Text style={styles.buttonText}>
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
