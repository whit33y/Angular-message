import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
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
  placeholder = [0,1,2,3,4,5,6,7,8,9]

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onListChat() {
    this.chat_service
      .listChat()
      .then((res: Chat[] | null) => {
        if (res) {
          this.chats.set(res);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  scrollToBottom() {
    if (this.chatContainer) {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  ngOnDestroy() {
    this.newMessageSubscription.unsubscribe();
  }
}
