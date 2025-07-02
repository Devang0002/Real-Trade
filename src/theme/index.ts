import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  
  // Shadow styles for cards and elevated elements
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },

  // Common animation durations
  animations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  // Screen dimensions helpers
  screen: {
    padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
} as const;

export type Theme = typeof theme;
export { colors, typography, spacing };