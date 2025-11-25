import { Theme } from '../interfaces/theme.interface';

export const LightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    accent: '#10b981',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      bold: '600'
    }
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '2rem'
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem'
  }
};

export const DarkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    accent: '#34d399',
    border: '#334155',
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      bold: '600'
    }
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '2rem'
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem'
  }
};

export const AcademicTheme: Theme = {
  name: 'academic',
  colors: {
    primary: '#7c3aed',
    secondary: '#6b7280',
    background: '#fefce8',
    surface: '#fffbeb',
    text: '#374151',
    textSecondary: '#6b7280',
    accent: '#f59e0b',
    border: '#d1d5db',
    shadow: 'rgba(0, 0, 0, 0.05)'
  },
  typography: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      bold: '700'
    }
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '2rem'
  },
  borderRadius: {
    small: '0.125rem',
    medium: '0.25rem',
    large: '0.5rem'
  }
};