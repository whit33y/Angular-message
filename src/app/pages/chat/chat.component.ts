import { Component, effect, inject, signal } from '@angular/core';
import { ChatCardComponent } from '../../components/chat-card/chat-card.component';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatService } from '../../supabase/chat.service';
import { Chat } from '../../interface/chat.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatCardComponent, ChatInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  private newMessageSubscription: Subscription | any;
  private chat_service = inject(ChatService);
  chats = signal<Chat[]>([]);

  constructor() {
    effect(() => {
      this.onListChat();
    });
  }

  ngOnInit() {
    this.newMessageSubscription = this.chat_service
      .getNewMessages()
      .subscribe((updatedChats: Chat[]) => {
        this.chats.set(updatedChats);
      });
  }

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

  ngOnDestroy() {
    this.newMessageSubscription.unsubscribe();
  }
}
