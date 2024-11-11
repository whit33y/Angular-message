import { Component, effect, inject, signal } from '@angular/core';
import { ChatCardComponent } from '../../components/chat-card/chat-card.component';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatService } from '../../supabase/chat.service';
import { Chat } from '../../interface/chat.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatCardComponent, ChatInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  constructor() {
    effect(() => {
      this.onListChat();
    });
  }

  chats = signal<Chat[]>([]);

  private chat_service = inject(ChatService);

  onListChat() {
    this.chat_service
      .listChat()
      .then((res: Chat[] | null) => {
        if (res) {
          this.chats.set(res);
        } else {
          console.log('No messages found');
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
