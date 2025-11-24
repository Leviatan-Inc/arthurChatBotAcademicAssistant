export interface MessageData {
  content: string;
  sender: 'user' | 'bot';
  timestamp?: number;
  id?: string;
  type?: 'text' | 'audio' | 'image' | 'file';
  metadata?: any;
}

export interface MessageComponentInterface {
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
  messageId: string;
  messageType: string;
}