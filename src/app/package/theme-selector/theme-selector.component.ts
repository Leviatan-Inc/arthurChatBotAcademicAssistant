import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeManagerService, ThemeType } from '../../service/theme-manager.service';
import { Theme } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentTheme: ThemeType = 'light';
  availableThemes = this.themeManager.getAvailableThemes();
  isOpen = false;

  constructor(private themeManager: ThemeManagerService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeManager.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.currentTheme = theme.name as ThemeType;
      });
    
    // Initialize with current theme
    this.currentTheme = this.themeManager.getCurrentThemeType();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectTheme(themeType: ThemeType): void {
    this.themeManager.setTheme(themeType);
    this.isOpen = false;
  }

  getCurrentThemeName(): string {
    const currentTheme = this.availableThemes.find((t: any) => t.type === this.currentTheme);
    return currentTheme ? currentTheme.name : 'Light Theme';
  }

  onKeyDown(event: KeyboardEvent, themeType?: ThemeType): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (themeType) {
        this.selectTheme(themeType);
      } else {
        this.toggleDropdown();
      }
    } else if (event.key === 'Escape' && this.isOpen) {
      this.isOpen = false;
    }
  }

  // Handle clicks outside to close dropdown
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.theme-selector');
    
    if (dropdown && !dropdown.contains(target)) {
      this.isOpen = false;
    }
  }

  // TrackBy function for ngFor optimization
  trackByThemeType(index: number, theme: any): ThemeType {
    return theme.type;
  }
}