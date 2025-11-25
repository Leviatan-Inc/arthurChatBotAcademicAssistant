import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageComponentInterface } from '../../interfaces/message.interface';
import { ThemeManagerService } from '../../service/theme-manager.service';
import { Theme } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-bot-message-new',
  templateUrl: './bot-message-new.component.html',
  styleUrls: ['./bot-message-new.component.css']
})
export class BotMessageNewComponent implements MessageComponentInterface, OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() sender: 'user' | 'bot' = 'bot';
  @Input() timestamp: number = Date.now();
  @Input() messageId: string = '';
  @Input() messageType: string = 'text';
  @Input() showTimestamp: boolean = false;
  @Input() enableTypingAnimation: boolean = true;

  displayContent: string = '';
  isTyping: boolean = false;
  private typingInterval?: number;
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

    if (this.enableTypingAnimation && this.content) {
      this.startTypingAnimation();
    } else {
      this.displayContent = this.content;
    }
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startTypingAnimation(): void {
    this.isTyping = true;
    this.displayContent = '';
    let currentIndex = 0;

    this.typingInterval = window.setInterval(() => {
      if (currentIndex < this.content.length) {
        this.displayContent += this.content[currentIndex];
        currentIndex++;
      } else {
        this.isTyping = false;
        if (this.typingInterval) {
          clearInterval(this.typingInterval);
        }
      }
    }, 50); // Velocidad de escritura
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}