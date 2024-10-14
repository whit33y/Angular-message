import { Component } from '@angular/core';
import { ChatCardComponent } from '../../components/chat-card/chat-card.component';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatCardComponent, ChatInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {}
