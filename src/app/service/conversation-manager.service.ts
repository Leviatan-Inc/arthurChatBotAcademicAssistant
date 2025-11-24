export interface Message {
  id: string;
  timestamp: number;
  sender: 'user' | 'bot';
  content: string;
  type: 'text' | 'audio';
}

export interface ConversationData {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  messages: Message[];
  metadata: {
    userAgent: string;
    language: string;
    timezone: string;
  };
}

export class ConversationManager {
  private static instance: ConversationManager;
  private conversationData!: ConversationData;
  private readonly STORAGE_KEY = 'conversation_data';

  private constructor() {
    this.initializeConversation();
  }

  public static getInstance(): ConversationManager {
    if (!ConversationManager.instance) {
      ConversationManager.instance = new ConversationManager();
    }
    return ConversationManager.instance;
  }

  private initializeConversation(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    
    if (saved) {
      try {
        this.conversationData = JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved conversation:', error);
        this.createNewConversation();
      }
    } else {
      this.createNewConversation();
    }
  }

  private createNewConversation(): void {
    this.conversationData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      messages: [],
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };
    this.saveToStorage();
  }

  private generateSessionId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.conversationData));
    } catch (error) {
      console.error('Error saving conversation to storage:', error);
    }
  }

  public addMessage(sender: 'user' | 'bot', content: string, type: 'text' | 'audio' = 'text'): string {
    const message: Message = {
      id: this.generateMessageId(),
      timestamp: Date.now(),
      sender,
      content,
      type
    };

    this.conversationData.messages.push(message);
    this.conversationData.lastActivity = Date.now();
    this.saveToStorage();

    return message.id;
  }

  public getMessages(): Message[] {
    return [...this.conversationData.messages];
  }

  public getConversationData(): ConversationData {
    return { ...this.conversationData };
  }

  public getMessageById(id: string): Message | undefined {
    return this.conversationData.messages.find(msg => msg.id === id);
  }

  public updateMessage(id: string, newContent: string): boolean {
    const message = this.conversationData.messages.find(msg => msg.id === id);
    if (message) {
      message.content = newContent;
      this.conversationData.lastActivity = Date.now();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deleteMessage(id: string): boolean {
    const index = this.conversationData.messages.findIndex(msg => msg.id === id);
    if (index !== -1) {
      this.conversationData.messages.splice(index, 1);
      this.conversationData.lastActivity = Date.now();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public clearConversation(): void {
    this.createNewConversation();
  }

  public getConversationStats() {
    const messages = this.conversationData.messages;
    const userMessages = messages.filter(msg => msg.sender === 'user');
    const botMessages = messages.filter(msg => msg.sender === 'bot');
    
    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      duration: Date.now() - this.conversationData.startTime,
      lastActivity: this.conversationData.lastActivity
    };
  }

  public exportConversation(): string {
    const exportData = {
      ...this.conversationData,
      stats: this.getConversationStats(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  }

  public downloadConversation(filename?: string): void {
    const data = this.exportConversation();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `conversation_${this.conversationData.sessionId}_${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  }

  public importConversation(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      if (this.validateConversationData(imported)) {
        this.conversationData = imported;
        this.saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing conversation:', error);
      return false;
    }
  }

  private validateConversationData(data: any): boolean {
    return (
      data &&
      typeof data.sessionId === 'string' &&
      typeof data.startTime === 'number' &&
      typeof data.lastActivity === 'number' &&
      Array.isArray(data.messages) &&
      data.metadata &&
      typeof data.metadata === 'object'
    );
  }
}