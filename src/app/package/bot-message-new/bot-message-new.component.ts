import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MessageComponentInterface } from '../../interfaces/message.interface';

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

  ngOnInit(): void {
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