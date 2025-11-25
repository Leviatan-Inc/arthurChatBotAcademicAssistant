import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  ThemeAbstractFactory, 
  Theme,
  ThemedMessageComponent,
  ThemedButtonComponent,
  ThemedContainerComponent
} from '../interfaces/theme.interface';
import { LightThemeFactory } from '../themes/light-theme.factory';
import { DarkThemeFactory } from '../themes/dark-theme.factory';
import { AcademicThemeFactory } from '../themes/academic-theme.factory';

export type ThemeType = 'light' | 'dark' | 'academic';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  private static instance: ThemeManagerService;
  private currentFactory!: ThemeAbstractFactory;
  private currentThemeSubject = new BehaviorSubject<Theme>(new LightThemeFactory().getTheme());
  
  public currentTheme$: Observable<Theme> = this.currentThemeSubject.asObservable();

  constructor(
    private lightFactory: LightThemeFactory,
    private darkFactory: DarkThemeFactory,
    private academicFactory: AcademicThemeFactory
  ) {
    // Singleton pattern implementation
    if (ThemeManagerService.instance) {
      return ThemeManagerService.instance;
    }
    
    this.currentFactory = this.lightFactory;
    this.loadSavedTheme();
    ThemeManagerService.instance = this;
  }

  static getInstance(): ThemeManagerService {
    if (!ThemeManagerService.instance) {
      ThemeManagerService.instance = new ThemeManagerService(
        new LightThemeFactory(),
        new DarkThemeFactory(),
        new AcademicThemeFactory()
      );
    }
    return ThemeManagerService.instance;
  }

  setTheme(themeType: ThemeType): void {
    switch (themeType) {
      case 'light':
        this.currentFactory = this.lightFactory;
        break;
      case 'dark':
        this.currentFactory = this.darkFactory;
        break;
      case 'academic':
        this.currentFactory = this.academicFactory;
        break;
      default:
        this.currentFactory = this.lightFactory;
    }

    const newTheme = this.currentFactory.getTheme();
    this.currentThemeSubject.next(newTheme);
    this.saveTheme(themeType);
    this.applyGlobalTheme(newTheme);
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  getCurrentThemeType(): ThemeType {
    return this.getCurrentTheme().name as ThemeType;
  }

  // Factory methods delegated to current theme factory
  createMessageComponent(message: string, type: 'user' | 'bot'): ThemedMessageComponent {
    return this.currentFactory.createMessageComponent(message, type);
  }

  createButtonComponent(label: string, onClick: () => void): ThemedButtonComponent {
    return this.currentFactory.createButtonComponent(label, onClick);
  }

  createContainerComponent(): ThemedContainerComponent {
    return this.currentFactory.createContainerComponent();
  }

  // Theme persistence
  private saveTheme(themeType: ThemeType): void {
    try {
      localStorage.setItem('arthur-chat-theme', themeType);
    } catch (error) {
      console.warn('Unable to save theme to localStorage:', error);
    }
  }

  private loadSavedTheme(): void {
    try {
      const savedTheme = localStorage.getItem('arthur-chat-theme') as ThemeType;
      if (savedTheme && ['light', 'dark', 'academic'].includes(savedTheme)) {
        this.setTheme(savedTheme);
      }
    } catch (error) {
      console.warn('Unable to load theme from localStorage:', error);
    }
  }

  // Apply theme globally to CSS custom properties
  private applyGlobalTheme(theme: Theme): void {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-shadow', theme.colors.shadow);
    
    // Typography
    root.style.setProperty('--theme-font-family', theme.typography.fontFamily);
    root.style.setProperty('--theme-font-size-small', theme.typography.fontSize.small);
    root.style.setProperty('--theme-font-size-medium', theme.typography.fontSize.medium);
    root.style.setProperty('--theme-font-size-large', theme.typography.fontSize.large);
    root.style.setProperty('--theme-font-weight-light', theme.typography.fontWeight.light);
    root.style.setProperty('--theme-font-weight-normal', theme.typography.fontWeight.normal);
    root.style.setProperty('--theme-font-weight-bold', theme.typography.fontWeight.bold);
    
    // Spacing
    root.style.setProperty('--theme-spacing-small', theme.spacing.small);
    root.style.setProperty('--theme-spacing-medium', theme.spacing.medium);
    root.style.setProperty('--theme-spacing-large', theme.spacing.large);
    root.style.setProperty('--theme-spacing-xl', theme.spacing.extraLarge);
    
    // Border radius
    root.style.setProperty('--theme-border-radius-small', theme.borderRadius.small);
    root.style.setProperty('--theme-border-radius-medium', theme.borderRadius.medium);
    root.style.setProperty('--theme-border-radius-large', theme.borderRadius.large);

    // Apply theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.name}`);
  }

  // Get all available themes
  getAvailableThemes(): Array<{type: ThemeType, name: string, description: string}> {
    return [
      {
        type: 'light',
        name: 'Light Theme',
        description: 'Clean and modern light interface'
      },
      {
        type: 'dark',
        name: 'Dark Theme',
        description: 'Elegant dark interface for low-light environments'
      },
      {
        type: 'academic',
        name: 'Academic Theme',
        description: 'Professional theme with serif typography for academic contexts'
      }
    ];
  }
}