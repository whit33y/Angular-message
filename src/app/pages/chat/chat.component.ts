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

  messages: any[] = [];
  private newMessagesSubscription: Subscription | any;

  
  constructor() {
    effect(() => {
      this.onListChat();
    });
  }

  ngOnInit() {
    this.newMessagesSubscription = this.chat_service.newMessages.subscribe(
      (newMessages) => {
        this.messages = newMessages;
      }
    );
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

  ngOnDestroy() {

    if (this.newMessagesSubscription) {
      this.newMessagesSubscription.unsubscribe();
    }
  }

}
