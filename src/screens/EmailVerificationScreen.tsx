import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@/components';
import { theme } from '@/theme';

interface EmailVerificationScreenProps {
  email: string;
  onResendEmail: () => void;
  onEmailVerified: () => void;
  onChangeEmail: () => void;
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onResendEmail,
  onEmailVerified,
  onChangeEmail,
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResendEmail();
    setCountdown(60);
    setCanResend(false);
  };

  const getMaskedEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return `${maskedUsername}@${domain}`;
  };

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
        {/* Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
            style={styles.icon}>
            <Text style={styles.iconText}>📧</Text>
          </LinearGradient>
        </View>

        {/* Header */}
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification link to
        </Text>
        <Text style={styles.email}>{getMaskedEmail(email)}</Text>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            Click the link in the email to verify your account.
            {'\n\n'}
            If you don't see the email, check your spam folder.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="I've Verified My Email"
            onPress={onEmailVerified}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>
                  Didn't receive it? Resend Email
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.countdownText}>
                Resend available in {countdown}s
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.changeEmailLink}
            onPress={onChangeEmail}>
            <Text style={styles.changeEmailText}>
              Use a different email address
            </Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>
            Having trouble?{' '}
            <TouchableOpacity>
              <Text style={styles.supportLink}>Contact Support</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen.padding,
    paddingTop: theme.spacing['6xl'],
    alignItems: 'center',
  },
  iconContainer: {
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
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing['3xl'],
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
    width: '100%',
    alignItems: 'center',
  },
  verifyButton: {
    marginBottom: theme.spacing['2xl'],
  },
  resendContainer: {
    marginBottom: theme.spacing.lg,
  },
  resendLink: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
    textAlign: 'center',
  },
  countdownText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  changeEmailLink: {
    marginBottom: theme.spacing['3xl'],
  },
  changeEmailText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  supportContainer: {
    marginTop: 'auto',
    paddingBottom: theme.spacing['3xl'],
  },
  supportText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  supportLink: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
});