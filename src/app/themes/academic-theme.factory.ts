import { Injectable } from '@angular/core';
import { 
  ThemeAbstractFactory, 
  ThemedMessageComponent, 
  ThemedButtonComponent, 
  ThemedContainerComponent,
  Theme
} from '../interfaces/theme.interface';
import { AcademicTheme } from '../themes/theme-definitions';

// Academic Theme Components
export class AcademicMessageComponent implements ThemedMessageComponent {
  constructor(private message: string, private type: 'user' | 'bot') {}

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = this.type === 'user' ? theme.colors.primary : theme.colors.surface;
      element.style.color = this.type === 'user' ? '#ffffff' : theme.colors.text;
      element.style.borderRadius = theme.borderRadius.small; // More conservative radius for academic look
      element.style.padding = theme.spacing.large; // More generous padding
      element.style.fontFamily = theme.typography.fontFamily; // Serif font for academic feel
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.fontWeight = theme.typography.fontWeight.normal;
      element.style.border = `2px solid ${theme.colors.border}`;
      element.style.lineHeight = '1.6'; // Better readability
      element.style.boxShadow = `0 1px 3px ${theme.colors.shadow}`;
    }
  }

  getMessage(): string {
    return this.message;
  }

  getType(): 'user' | 'bot' {
    return this.type;
  }

  private getElement(): HTMLElement | null {
    return document.querySelector('.message-component') as HTMLElement;
  }
}

export class AcademicButtonComponent implements ThemedButtonComponent {
  constructor(private label: string, private clickHandler: () => void) {}

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = 'transparent';
      element.style.color = theme.colors.primary;
      element.style.border = `2px solid ${theme.colors.primary}`;
      element.style.borderRadius = theme.borderRadius.small;
      element.style.padding = `${theme.spacing.small} ${theme.spacing.large}`;
      element.style.fontFamily = theme.typography.fontFamily;
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.fontWeight = theme.typography.fontWeight.bold;
      element.style.cursor = 'pointer';
      element.style.transition = 'all 0.3s ease';
      element.style.textTransform = 'uppercase';
      element.style.letterSpacing = '0.05em';
    }
  }

  getLabel(): string {
    return this.label;
  }

  onClick(): void {
    this.clickHandler();
  }

  private getElement(): HTMLElement | null {
    return document.querySelector('.themed-button') as HTMLElement;
  }
}

export class AcademicContainerComponent implements ThemedContainerComponent {
  private children: any[] = [];

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = theme.colors.background;
      element.style.borderRadius = theme.borderRadius.small;
      element.style.padding = theme.spacing.extraLarge;
      element.style.border = `1px solid ${theme.colors.border}`;
      element.style.boxShadow = `0 2px 4px ${theme.colors.shadow}`;
      element.style.margin = theme.spacing.medium;
    }
  }

  addChild(component: any): void {
    this.children.push(component);
  }

  private getElement(): HTMLElement | null {
    return document.querySelector('.themed-container') as HTMLElement;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AcademicThemeFactory implements ThemeAbstractFactory {
  createMessageComponent(message: string, type: 'user' | 'bot'): ThemedMessageComponent {
    return new AcademicMessageComponent(message, type);
  }

  createButtonComponent(label: string, onClick: () => void): ThemedButtonComponent {
    return new AcademicButtonComponent(label, onClick);
  }

  createContainerComponent(): ThemedContainerComponent {
    return new AcademicContainerComponent();
  }

  getTheme(): Theme {
    return AcademicTheme;
  }
}