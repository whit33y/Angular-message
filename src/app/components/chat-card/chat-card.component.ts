import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.css',
})
export class ChatCardComponent {
  @Input() author: string = '';
  @Input() avatar_url: string = '';
  @Input() message: string = '';
  @Input() created_at: string = '';
  @Input() id: string = '';

  private chat_service = inject(ChatService);
  private router = inject(Router);

  constructor() {}

  deleteChat(id: string) {
    this.chat_service
      .deleteChat(id)
      .then(() => {
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
}
