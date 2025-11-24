import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageData } from '../interfaces/message.interface';
import { MessageFactory } from '../factory/message.factory';
import { ConversationManager } from './conversation-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<MessageData[]>([]);
  public messages$: Observable<MessageData[]> = this.messagesSubject.asObservable();

  private conversationManager = ConversationManager.getInstance();

  constructor() {
    this.loadExistingMessages();
  }

  private loadExistingMessages(): void {
    const existingMessages = this.conversationManager.getMessages();
    const messageData: MessageData[] = existingMessages.map(msg => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp,
      type: msg.type as 'text' | 'audio' | 'image' | 'file'
    }));
    this.messagesSubject.next(messageData);
  }

  addMessage(messageData: MessageData): string {
    const messageId = this.conversationManager.addMessage(
      messageData.sender,
      messageData.content,
      messageData.type as 'text' | 'audio' || 'text'
    );

    const completeMessageData: MessageData = {
      ...messageData,
      id: messageId,
      timestamp: messageData.timestamp || Date.now()
    };

    const currentMessages = this.messagesSubject.getValue();
    const updatedMessages = [...currentMessages, completeMessageData];
    this.messagesSubject.next(updatedMessages);

    return messageId;
  }

  updateMessage(messageId: string, newContent: string): boolean {
    const success = this.conversationManager.updateMessage(messageId, newContent);
    
    if (success) {
      const currentMessages = this.messagesSubject.getValue();
      const updatedMessages = currentMessages.map(msg => 
        msg.id === messageId ? { ...msg, content: newContent } : msg
      );
      this.messagesSubject.next(updatedMessages);
    }

    return success;
  }

  deleteMessage(messageId: string): boolean {
    const success = this.conversationManager.deleteMessage(messageId);
    
    if (success) {
      const currentMessages = this.messagesSubject.getValue();
      const updatedMessages = currentMessages.filter(msg => msg.id !== messageId);
      this.messagesSubject.next(updatedMessages);
    }

    return success;
  }

  clearAllMessages(): void {
    this.conversationManager.clearConversation();
    this.messagesSubject.next([]);
  }

  getMessages(): MessageData[] {
    return this.messagesSubject.getValue();
  }

  getMessageById(messageId: string): MessageData | undefined {
    return this.messagesSubject.getValue().find(msg => msg.id === messageId);
  }

  createMessageUsingFactory(messageData: MessageData): {
    component: any;
    properties: any;
  } {
    return MessageFactory.createMessageComponentStatic(messageData);
  }

  getSupportedMessageTypes(): string[] {
    return MessageFactory.getSupportedMessageTypes();
  }

  getSupportedSenders(): ('user' | 'bot')[] {
    return MessageFactory.getSupportedSenders();
  }

  getMessageStats(): {
    total: number;
    userMessages: number;
    botMessages: number;
    byType: { [key: string]: number };
  } {
    const messages = this.messagesSubject.getValue();
    const stats = {
      total: messages.length,
      userMessages: messages.filter(m => m.sender === 'user').length,
      botMessages: messages.filter(m => m.sender === 'bot').length,
      byType: {} as { [key: string]: number }
    };

    messages.forEach(msg => {
      const type = msg.type || 'text';
      stats.byType[type] = (stats.byType[type] || 0) + 1;
    });

    return stats;
  }
}