import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
