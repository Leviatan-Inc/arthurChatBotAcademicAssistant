import { Component, Input } from '@angular/core';
import { MessageComponentInterface } from '../../interfaces/message.interface';

@Component({
  selector: 'app-user-message',
  template: `
    <div class="user-message-container">
      <div class="timestamp" *ngIf="showTimestamp">
        {{ formatTime(timestamp) }}
      </div>
      <div class="message-content user-content">
        <p>{{ content }}</p>
      </div>
      <div class="message-info">
        <span class="sender">You</span>
      </div>
    </div>
  `,
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements MessageComponentInterface {
  @Input() content: string = '';
  @Input() sender: 'user' | 'bot' = 'user';
  @Input() timestamp: number = Date.now();
  @Input() messageId: string = '';
  @Input() messageType: string = 'text';
  @Input() showTimestamp: boolean = false;

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}