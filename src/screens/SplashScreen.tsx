import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '@/theme';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Logo animation sequence
    Animated.sequence([
      // Logo fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Tagline slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1000),
    ]).start(() => {
      // Navigate to next screen after animation
      setTimeout(onAnimationComplete, 500);
    });
  }, [fadeAnim, scaleAnim, slideAnim, onAnimationComplete]);

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
        {/* Animated Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <View style={styles.logo}>
            <LinearGradient
              colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
              style={styles.logoGradient}>
              <Text style={styles.logoText}>RT</Text>
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>Real Trade</Text>
        </Animated.View>

        {/* Animated Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.tagline}>
            Automated Crypto Trading.{'\n'}
            <Text style={styles.taglineAccent}>Smarter. Faster.</Text>
          </Text>
        </Animated.View>

        {/* Animated indicator dots */}
        <Animated.View
          style={[
            styles.indicatorContainer,
            { opacity: fadeAnim },
          ]}>
          <View style={styles.indicatorDots}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: scaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing['3xl'],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.large,
  },
  logoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  brandName: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['5xl'],
  },
  tagline: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.sizes.lg,
  },
  taglineAccent: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: theme.spacing['5xl'],
  },
  indicatorDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 4,
  },
});