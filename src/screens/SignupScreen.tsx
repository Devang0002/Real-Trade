import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Input } from '@/components';
import { theme } from '@/theme';

interface SignupScreenProps {
  onSignup: (userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    referralCode?: string;
  }) => void;
  onNavigateToLogin: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSignup,
  onNavigateToLogin,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    referralCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    terms?: string;
  }>({});

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSignup(formData);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
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
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
                style={styles.logo}>
                <Text style={styles.logoText}>RT</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join thousands of successful traders
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => updateField('fullName', value)}
              error={errors.fullName}
              autoCapitalize="words"
              required
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              required
            />

            <Input
              label="Mobile Number"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChangeText={(value) => updateField('mobileNumber', value)}
              error={errors.mobileNumber}
              keyboardType="phone-pad"
              required
            />

            <Input
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              error={errors.password}
              isPassword
              required
            />

            <Input
              label="Referral Code"
              placeholder="Enter referral code (optional)"
              value={formData.referralCode}
              onChangeText={(value) => updateField('referralCode', value)}
              autoCapitalize="characters"
            />

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAcceptedTerms(!acceptedTerms)}>
                <View style={[styles.checkboxInner, acceptedTerms && styles.checkboxChecked]}>
                  {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
            {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              style={styles.signupButton}
            />
          </View>

          {/* Benefits Preview */}
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Why Choose Real Trade?</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🤖</Text>
                <Text style={styles.benefitText}>24/7 Automated Trading</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🔐</Text>
                <Text style={styles.benefitText}>Bank-Grade Security</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>💰</Text>
                <Text style={styles.benefitText}>Earn from Referrals</Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.screen.padding,
    paddingTop: theme.spacing['4xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  logoContainer: {
    marginBottom: theme.spacing.md,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  logoText: {
    fontSize: 20,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  title: {
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: theme.spacing.lg,
  },
  checkbox: {
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: theme.typography.weights.bold,
  },
  termsText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.sm,
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  errorText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
    marginTop: -theme.spacing.sm,
  },
  signupButton: {
    marginTop: theme.spacing.md,
  },
  benefitsContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.spacing.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.small,
  },
  benefitsTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  benefitsList: {
    gap: theme.spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  benefitText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
  footerText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
  },
  loginLink: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
});