import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonajeService } from 'src/app/service/personaje.service'
import { AppComponent } from 'src/app/app.component';
import { ApiBotService } from 'src/app/service/api-bot.service';
import { ChangeDetectorRef } from '@angular/core';
import { ConversationManager } from 'src/app/service/conversation-manager.service';
import { MessageService } from 'src/app/service/message.service';
import { MessageData } from 'src/app/interfaces/message.interface';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent {
  public something : any[] = [];

  micDisables : boolean = false;
  messageBot : string = 'Hola';

  textBox : string = '';

  elementBox : any = '';

  recognition: any = new (window as any).webkitSpeechRecognition();

  private conversationManager = ConversationManager.getInstance();

  constructor(private service: ApiBotService, private render2 : Renderer2,
    private changeDetectorRef: ChangeDetectorRef, private messageService: MessageService
  ){
    this.recognition.lang = 'es-ES';
  }

  @ViewChild('inputDataDiv') element!: ElementRef;

  //oninit
  ngOnInit(){
    console.log('Bar component start');
    //this.something.push({"me" : "Hola", "you" : "Hola"});
  }

  public send = () => {

    if(this.textBox == '' || this.textBox == undefined){
      alert(`Type something First, don't be a fool  :3`);
    }else {
      // Add user message using MessageService and Factory pattern
      const userMessageData: MessageData = {
        content: this.textBox,
        sender: 'user',
        type: 'text',
        timestamp: Date.now()
      };
      
      const userMessageId = this.messageService.addMessage(userMessageData);
      
      this.service.sendMessageToArthur(this.jsonBodyGenerator(this.textBox)).subscribe(
        (data) => {
          console.log(data.response);
          
          // Add bot response using MessageService and Factory pattern
          const botMessageData: MessageData = {
            content: data.response,
            sender: 'bot',
            type: 'text',
            timestamp: Date.now()
          };
          
          this.messageService.addMessage(botMessageData);
        },
        (error) => {
          console.log(error);
          const errorMessage = 'An error has ocurred while processing your request :(';
          
          // Add error message using MessageService and Factory pattern
          const errorMessageData: MessageData = {
            content: errorMessage,
            sender: 'bot',
            type: 'text',
            timestamp: Date.now()
          };
          
          this.messageService.addMessage(errorMessageData);
        });
        
        // Clear text box
        this.textBox = '';
      }
    }

  //chat enter key
  public enterKey = (event : any) => {
    if(event.keyCode === 13){
      alert(`Enter key has been pressed`);
      //this.send(this.element);
    }
  }

  public getValue(val : any){
    this.textBox = val.value;
  }

  public jsonBodyGenerator(data : any){
    let jsonBody = {
      "inputData" : data
    }
    console.log(jsonBody);
    return jsonBody;
  }
  public slowTypingBot(data : string){
    //slow type and modify the last me form something array
    this.something[this.something.length - 1].you = '';
    let i = 0;
    let interval = setInterval(() => {
      this.something[this.something.length - 1].you += data[i];
      i++;
      if(i == data.length){
        clearInterval(interval);
      }
    }, 100);
  }

  //speach dictation
  public saySomething() : void{
    console.log('Hola');
    //use speach synthesis
    speechSynthesis.speak(new SpeechSynthesisUtterance('how are you doing today?'));
  }



  public speechDictation() : void{
    //use speach recognition
    this.recognition.start();
      this.micDisables = true;
      this.recognition.onresult = (event: any) => {
        this.micDisables = false;
        this.textBox = event.results[0][0].transcript;
        console.log(this.textBox);
        this.recognition.stop();
        this.changeDetectorRef.detectChanges();
      }
      this.recognition.onend = () => {
        this.micDisables = false;
      }
      this.changeDetectorRef.detectChanges();

  }
}