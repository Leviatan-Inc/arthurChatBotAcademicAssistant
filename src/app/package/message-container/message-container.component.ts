import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { MessageData, MessageComponentInterface } from '../../interfaces/message.interface';
import { MessageFactory } from '../../factory/message.factory';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.css']
})
export class MessageContainerComponent implements OnInit, OnDestroy {
  @Input() messageData!: MessageData;
  @ViewChild('messageContainer', { read: ViewContainerRef, static: true }) 
  container!: ViewContainerRef;

  private componentRef?: ComponentRef<MessageComponentInterface>;

  ngOnInit(): void {
    this.createMessageComponent();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createMessageComponent(): void {
    if (!this.messageData) {
      console.error('MessageData is required');
      return;
    }

    try {
      this.componentRef = MessageFactory.createMessageComponent(
        this.container,
        this.messageData
      );
    } catch (error) {
      console.error('Error creating message component:', error);
    }
  }

  updateMessage(newMessageData: MessageData): void {
    this.messageData = newMessageData;
    this.createMessageComponent();
  }

  getComponentInstance(): MessageComponentInterface | undefined {
    return this.componentRef?.instance;
  }
}