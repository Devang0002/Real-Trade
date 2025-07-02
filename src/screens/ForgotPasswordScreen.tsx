import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Input } from '@/components';
import { theme } from '@/theme';

interface ForgotPasswordScreenProps {
  onSendResetLink: (email: string) => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSendResetLink,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSendResetLink(email);
      setResetSent(true);
    } catch (error) {
      console.error('Reset failed:', error);
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResetSent(false);
    setEmail('');
    setError('');
  };

  if (resetSent) {
    return (
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.background}
          translucent
        />
        
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
              style={styles.icon}>
              <Text style={styles.iconText}>✉️</Text>
            </LinearGradient>
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Reset Link Sent!</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to
          </Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Check your email and click the link to reset your password.
              {'\n\n'}
              The link will expire in 24 hours.
            </Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Back to Login"
              onPress={onBackToLogin}
              style={styles.button}
            />

            <TouchableOpacity
              style={styles.tryAgainLink}
              onPress={handleTryAgain}>
              <Text style={styles.tryAgainText}>
                Try with a different email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        translucent
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
                style={styles.logo}>
                <Text style={styles.logoText}>🔐</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Enter your registered email"
              value={email}
              onChangeText={setEmail}
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              required
            />

            <Button
              title="Send Reset Link"
              onPress={handleSendResetLink}
              loading={loading}
              style={styles.button}
            />
          </View>

          {/* Help Section */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpTitle}>Need more help?</Text>
            <Text style={styles.helpText}>
              If you're having trouble accessing your account, our support team is here to help.
            </Text>
            <TouchableOpacity style={styles.contactLink}>
              <Text style={styles.contactText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Back to Login */}
          <TouchableOpacity
            style={styles.backToLoginLink}
            onPress={onBackToLogin}>
            <Text style={styles.backToLoginText}>
              ← Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen.padding,
    paddingTop: theme.spacing['5xl'],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  logoText: {
    fontSize: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.base,
    marginBottom: theme.spacing.lg,
  },
  email: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  form: {
    marginBottom: theme.spacing['3xl'],
  },
  button: {
    marginTop: theme.spacing.lg,
  },
  instructionsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
    ...theme.shadows.small,
  },
  instructions: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.base,
  },
  actions: {
    alignItems: 'center',
  },
  tryAgainLink: {
    marginTop: theme.spacing.lg,
  },
  tryAgainText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  helpContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.small,
  },
  helpTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  helpText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.sm,
    marginBottom: theme.spacing.md,
  },
  contactLink: {
    alignSelf: 'center',
  },
  contactText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  backToLoginLink: {
    alignSelf: 'center',
    marginTop: 'auto',
    paddingBottom: theme.spacing['3xl'],
  },
  backToLoginText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
});