import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  SplashScreen,
  LoginScreen,
  SignupScreen,
  EmailVerificationScreen,
  ForgotPasswordScreen,
} from './screens';
import { theme } from './theme';

type AppScreen = 
  | 'splash'
  | 'login'
  | 'signup'
  | 'emailVerification'
  | 'forgotPassword'
  | 'dashboard'; // Future main app screen

interface UserData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  referralCode?: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [userEmail, setUserEmail] = useState('');

  // Splash Screen Handlers
  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  // Login Screen Handlers
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Here you would typically make an API call to authenticate
    // For demo purposes, we'll just log and transition
    setCurrentScreen('dashboard');
  };

  const handleNavigateToSignup = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };

  // Signup Screen Handlers
  const handleSignup = (userData: UserData) => {
    console.log('Signup attempt:', userData);
    setUserEmail(userData.email);
    // Here you would typically make an API call to create account
    // For demo purposes, we'll navigate to email verification
    setCurrentScreen('emailVerification');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  // Email Verification Handlers
  const handleResendEmail = () => {
    console.log('Resending verification email to:', userEmail);
    // Here you would make an API call to resend verification email
  };

  const handleEmailVerified = () => {
    console.log('Email verified for:', userEmail);
    // Here you would typically verify with backend
    setCurrentScreen('dashboard');
  };

  const handleChangeEmail = () => {
    setCurrentScreen('signup');
  };

  // Forgot Password Handlers
  const handleSendResetLink = (email: string) => {
    console.log('Sending reset link to:', email);
    setUserEmail(email);
    // Here you would make an API call to send reset link
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  // Dashboard (placeholder)
  const renderDashboard = () => (
    <SafeAreaView style={styles.dashboard}>
      {/* This would be your main app content */}
    </SafeAreaView>
  );

  // Screen Rendering
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onAnimationComplete={handleSplashComplete}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignup={handleNavigateToSignup}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        );

      case 'signup':
        return (
          <SignupScreen
            onSignup={handleSignup}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );

      case 'emailVerification':
        return (
          <EmailVerificationScreen
            email={userEmail}
            onResendEmail={handleResendEmail}
            onEmailVerified={handleEmailVerified}
            onChangeEmail={handleChangeEmail}
          />
        );

      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            onSendResetLink={handleSendResetLink}
            onBackToLogin={handleBackToLogin}
          />
        );

      case 'dashboard':
        return renderDashboard();

      default:
        return (
          <SplashScreen
            onAnimationComplete={handleSplashComplete}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderCurrentScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  dashboard: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;