import { Component } from '@angular/core';
import { ConversationManager } from '../../service/conversation-manager.service';

@Component({
  selector: 'app-download-conversation',
  templateUrl: './download-conversation.component.html',
  styleUrls: ['./download-conversation.component.css']
})
export class DownloadConversationComponent {
  showStats = false;
  stats: any = {};
  
  private conversationManager = ConversationManager.getInstance();

  constructor() {
    this.updateStats();
  }

  downloadConversation(): void {
    try {
      this.conversationManager.downloadConversation();
      this.showNotification('Conversation downloaded successfully!');
    } catch (error) {
      console.error('Error downloading conversation:', error);
      this.showNotification('Error downloading conversation', 'error');
    }
  }

  updateStats(): void {
    this.stats = this.conversationManager.getConversationStats();
  }

  formatDuration(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return '< 1m';
    }
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
    if (this.showStats) {
      this.updateStats();
    }
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    // Simple notification - you can replace this with a proper notification service
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}