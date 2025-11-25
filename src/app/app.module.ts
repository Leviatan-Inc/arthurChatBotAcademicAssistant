import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { BarComponent } from './package/bar/bar.component';
import { HeaderComponent } from './package/header/header.component';
import { ApiBotService } from './service/api-bot.service';
import { FormsModule } from '@angular/forms';
import { PresentationComponent } from './package/presentation/presentation.component';
import { DownloadConversationComponent } from './package/download-conversation/download-conversation.component';
import { UserMessageComponent } from './package/user-message/user-message.component';
import { BotMessageNewComponent } from './package/bot-message-new/bot-message-new.component';
import { MessageContainerComponent } from './package/message-container/message-container.component';
import { ThemeSelectorComponent } from './package/theme-selector/theme-selector.component';
import { ThemeManagerService } from './service/theme-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    HeaderComponent,
    PresentationComponent,
    DownloadConversationComponent,
    UserMessageComponent,
    BotMessageNewComponent,
    MessageContainerComponent,
    ThemeSelectorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiBotService,
    ThemeManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
