import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeManagerService } from '../../service/theme-manager.service';
import { MessageService } from '../../service/message.service';
import { ConversationManager } from '../../service/conversation-manager.service';
import { Theme } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  currentTheme!: Theme;

  constructor(
    private themeManager: ThemeManagerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeManager.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.currentTheme = theme;
        this.applyThemeToHeader();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyThemeToHeader(): void {
    // Apply theme-specific header styling if needed
    const headerElement = document.querySelector('.themed-header') as HTMLElement;
    if (headerElement && this.currentTheme) {
      headerElement.style.fontFamily = this.currentTheme.typography.fontFamily;
    }
  }

  clearChat(): void {
    // Show confirmation dialog
    const confirmClear = confirm('¿Are you sure you want to clear all conversation history? This action cannot be undone.');
    
    if (confirmClear) {
      // Clear messages - this will also clear the conversation manager
      this.messageService.clearAllMessages();
      
      console.log('Chat cleared successfully');
    }
  }
}
