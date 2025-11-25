import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageComponentInterface } from '../../interfaces/message.interface';
import { ThemeManagerService } from '../../service/theme-manager.service';
import { Theme } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements MessageComponentInterface, OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() sender: 'user' | 'bot' = 'user';
  @Input() timestamp: number = Date.now();
  @Input() messageId: string = '';
  @Input() messageType: string = 'text';
  @Input() showTimestamp: boolean = false;

  private destroy$ = new Subject<void>();
  currentTheme!: Theme;

  constructor(private themeManager: ThemeManagerService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeManager.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.currentTheme = theme;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}