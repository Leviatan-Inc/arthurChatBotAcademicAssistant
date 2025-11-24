import { ComponentRef, ViewContainerRef, Injectable } from '@angular/core';
import { MessageData, MessageComponentInterface } from '../interfaces/message.interface';
import { UserMessageComponent } from '../package/user-message/user-message.component';
import { BotMessageNewComponent } from '../package/bot-message-new/bot-message-new.component';

@Injectable({
  providedIn: 'root'
})
export class MessageFactory {
  
  static createMessageComponent(
    container: ViewContainerRef, 
    messageData: MessageData
  ): ComponentRef<MessageComponentInterface> {
    
    container.clear();
    
    let componentRef: ComponentRef<MessageComponentInterface>;
    
    switch (messageData.sender) {
      case 'user':
        componentRef = container.createComponent(UserMessageComponent);
        break;
      case 'bot':
        componentRef = container.createComponent(BotMessageNewComponent);
        break;
      default:
        throw new Error(`Unknown sender type: ${messageData.sender}`);
    }

    // Set component properties
    componentRef.instance.content = messageData.content;
    componentRef.instance.sender = messageData.sender;
    componentRef.instance.timestamp = messageData.timestamp || Date.now();
    componentRef.instance.messageId = messageData.id || this.generateId();
    componentRef.instance.messageType = messageData.type || 'text';

    return componentRef;
  }

  static createMessageComponentStatic(messageData: MessageData): {
    component: any;
    properties: MessageComponentInterface;
  } {
    let component: any;
    
    switch (messageData.sender) {
      case 'user':
        component = UserMessageComponent;
        break;
      case 'bot':
        component = BotMessageNewComponent;
        break;
      default:
        throw new Error(`Unknown sender type: ${messageData.sender}`);
    }

    const properties: MessageComponentInterface = {
      content: messageData.content,
      sender: messageData.sender,
      timestamp: messageData.timestamp || Date.now(),
      messageId: messageData.id || this.generateId(),
      messageType: messageData.type || 'text'
    };

    return { component, properties };
  }

  static getMessageConfig(sender: 'user' | 'bot'): {
    selector: string;
    component: any;
    styles: any[];
  } {
    switch (sender) {
      case 'user':
        return {
          selector: 'app-user-message',
          component: UserMessageComponent,
          styles: ['user-message']
        };
      case 'bot':
        return {
          selector: 'app-bot-message-new',
          component: BotMessageNewComponent,
          styles: ['bot-message']
        };
      default:
        throw new Error(`Unknown sender type: ${sender}`);
    }
  }

  private static generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  static getSupportedMessageTypes(): string[] {
    return ['text', 'audio', 'image', 'file'];
  }

  static getSupportedSenders(): ('user' | 'bot')[] {
    return ['user', 'bot'];
  }
}