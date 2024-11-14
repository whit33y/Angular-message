import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.css',
})
export class ChatCardComponent {
  private chat_service = inject(ChatService);
  private router = inject(Router);
  private auth = inject(AuthService);

  @Input() author: string = '';
  @Input() author_id: string = '';
  @Input() avatar_url: string = '';
  @Input() message: string = '';
  @Input() created_at: string = '';
  @Input() id: string = '';

  loggedUser: string = '';
  loggedUserId: any;
  constructor() {}

  ngOnInit() {
    this.loggedUser = this.auth.loggedUserId;
    this.loggedUserId = JSON.parse(this.loggedUser);
  }

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
        alert(err.message);
      });
  }
}
