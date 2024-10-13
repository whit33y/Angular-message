import { Component } from '@angular/core';
import { ChatCardComponent } from '../../components/chat-card/chat-card.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatCardComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
