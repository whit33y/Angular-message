import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;
  private newMessageSubject = new BehaviorSubject<any>(null); // To store new messages

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.listenForNewMessages();
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

  async deleteChat(id: string) {
    try {
      const data = await this.supabase.from('chats').delete().eq('id', id);
      return data;
    } catch (err) {
      throw err;
    }
  }

  // Real-time listener setup using a Supabase channel
  private listenForNewMessages() {
    const channel = this.supabase
      .channel('public:chats')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chats' },
        async () => {
          // Refresh the entire chat list to get full user details for each message
          const updatedChatList = await this.listChat();
          this.newMessageSubject.next(updatedChatList);
        }
      )
      .subscribe();
  }

  getNewMessages(): Observable<any> {
    return this.newMessageSubject.asObservable(); // Observable for new messages
  }
}
