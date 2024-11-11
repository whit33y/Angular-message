import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase
        .from('chats')
        .insert({ text });
      if (error) {
        alert(error.message);
      }
    } catch (err) {
      alert(err);
    }
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase
        .from('chats')
        .select('*,users(*)');
      if (error) {
        alert(error.message);
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}
