import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../pages/chat/chat.component';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent {
  private chat_service = inject(ChatService);
  private listChat = inject(ChatComponent);
  private fb = inject(FormBuilder);
  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });
  }

  onSubmit() {
    const form_value = this.chatForm.value.chat_message;
    this.chat_service
      .chatMessage(form_value)
      .then((res) => {
        this.chatForm.reset();
        this.listChat.onListChat();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
