import { Injectable } from '@angular/core';
import { 
  ThemeAbstractFactory, 
  ThemedMessageComponent, 
  ThemedButtonComponent, 
  ThemedContainerComponent,
  Theme
} from '../interfaces/theme.interface';
import { LightTheme } from '../themes/theme-definitions';

// Light Theme Components
export class LightMessageComponent implements ThemedMessageComponent {
  constructor(private message: string, private type: 'user' | 'bot') {}

  applyTheme(theme: Theme): void {
    // Apply light theme styling
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = this.type === 'user' ? theme.colors.primary : theme.colors.surface;
      element.style.color = this.type === 'user' ? '#ffffff' : theme.colors.text;
      element.style.borderRadius = theme.borderRadius.medium;
      element.style.padding = theme.spacing.medium;
      element.style.fontFamily = theme.typography.fontFamily;
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.boxShadow = `0 2px 8px ${theme.colors.shadow}`;
    }
  }

  getMessage(): string {
    return this.message;
  }

  getType(): 'user' | 'bot' {
    return this.type;
  }

  private getElement(): HTMLElement | null {
    // In a real implementation, this would reference the actual DOM element
    return document.querySelector('.message-component') as HTMLElement;
  }
}

export class LightButtonComponent implements ThemedButtonComponent {
  constructor(private label: string, private clickHandler: () => void) {}

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = theme.colors.primary;
      element.style.color = '#ffffff';
      element.style.border = 'none';
      element.style.borderRadius = theme.borderRadius.small;
      element.style.padding = `${theme.spacing.small} ${theme.spacing.medium}`;
      element.style.fontFamily = theme.typography.fontFamily;
      element.style.fontSize = theme.typography.fontSize.medium;
      element.style.fontWeight = theme.typography.fontWeight.normal;
      element.style.cursor = 'pointer';
      element.style.transition = 'all 0.2s ease';
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

export class LightContainerComponent implements ThemedContainerComponent {
  private children: any[] = [];

  applyTheme(theme: Theme): void {
    const element = this.getElement();
    if (element) {
      element.style.backgroundColor = theme.colors.background;
      element.style.borderRadius = theme.borderRadius.large;
      element.style.padding = theme.spacing.large;
      element.style.border = `1px solid ${theme.colors.border}`;
      element.style.boxShadow = `0 4px 12px ${theme.colors.shadow}`;
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
export class LightThemeFactory implements ThemeAbstractFactory {
  createMessageComponent(message: string, type: 'user' | 'bot'): ThemedMessageComponent {
    return new LightMessageComponent(message, type);
  }

  createButtonComponent(label: string, onClick: () => void): ThemedButtonComponent {
    return new LightButtonComponent(label, onClick);
  }

  createContainerComponent(): ThemedContainerComponent {
    return new LightContainerComponent();
  }

  getTheme(): Theme {
    return LightTheme;
  }
}