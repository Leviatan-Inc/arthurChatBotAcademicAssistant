import { Injectable } from '@angular/core';
import { 
  ThemeAbstractFactory, 
  ThemedMessageComponent, 
  ThemedButtonComponent, 
  ThemedContainerComponent,
  Theme
} from '../interfaces/theme.interface';
import { DarkTheme } from '../themes/theme-definitions';

// Dark Theme Components
export class DarkMessageComponent implements ThemedMessageComponent {
  constructor(private message: string, private type: 'user' | 'bot') {}

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = this.type === 'user' ? theme.colors.primary : theme.colors.surface;
      element.style.color = theme.colors.text;
      element.style.borderRadius = theme.borderRadius.medium;
      element.style.padding = theme.spacing.medium;
      element.style.fontFamily = theme.typography.fontFamily;
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.boxShadow = `0 4px 16px ${theme.colors.shadow}`;
      element.style.border = `1px solid ${theme.colors.border}`;
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

export class DarkButtonComponent implements ThemedButtonComponent {
  constructor(private label: string, private clickHandler: () => void) {}

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = theme.colors.primary;
      element.style.color = theme.colors.text;
      element.style.border = `1px solid ${theme.colors.border}`;
      element.style.borderRadius = theme.borderRadius.small;
      element.style.padding = `${theme.spacing.small} ${theme.spacing.medium}`;
      element.style.fontFamily = theme.typography.fontFamily;
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.fontWeight = theme.typography.fontWeight.normal;
      element.style.cursor = 'pointer';
      element.style.transition = 'all 0.2s ease';
      element.style.boxShadow = `0 2px 8px ${theme.colors.shadow}`;
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

export class DarkContainerComponent implements ThemedContainerComponent {
  private children: any[] = [];

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = theme.colors.background;
      element.style.borderRadius = theme.borderRadius.large;
      element.style.padding = theme.spacing.large;
      element.style.border = `1px solid ${theme.colors.border}`;
      element.style.boxShadow = `0 8px 24px ${theme.colors.shadow}`;
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
export class DarkThemeFactory implements ThemeAbstractFactory {
  createMessageComponent(message: string, type: 'user' | 'bot'): ThemedMessageComponent {
    return new DarkMessageComponent(message, type);
  }

  createButtonComponent(label: string, onClick: () => void): ThemedButtonComponent {
    return new DarkButtonComponent(label, onClick);
  }

  createContainerComponent(): ThemedContainerComponent {
    return new DarkContainerComponent();
  }

  getTheme(): Theme {
    return DarkTheme;
  }
}