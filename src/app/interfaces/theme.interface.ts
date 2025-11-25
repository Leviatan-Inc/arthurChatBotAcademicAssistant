// Theme interfaces for Abstract Factory pattern
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  shadow: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
  fontWeight: {
    light: string;
    normal: string;
    bold: string;
  };
}

export interface ThemeSpacing {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface ThemeBorderRadius {
  small: string;
  medium: string;
  large: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
}

// Component interfaces for theming
export interface ThemedMessageComponent {
  applyTheme(theme: Theme): void;
  getMessage(): string;
  getType(): 'user' | 'bot';
}

export interface ThemedButtonComponent {
  applyTheme(theme: Theme): void;
  getLabel(): string;
  onClick(): void;
}

export interface ThemedContainerComponent {
  applyTheme(theme: Theme): void;
  addChild(component: any): void;
}

// Abstract Factory interface
export interface ThemeAbstractFactory {
  createMessageComponent(message: string, type: 'user' | 'bot'): ThemedMessageComponent;
  createButtonComponent(label: string, onClick: () => void): ThemedButtonComponent;
  createContainerComponent(): ThemedContainerComponent;
  getTheme(): Theme;
}