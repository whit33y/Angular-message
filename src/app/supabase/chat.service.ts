import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environment';
import { BehaviorSubject } from 'rxjs';

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
    this.subscribeToNewMessages();
  }

  private newMessages$ = new BehaviorSubject<any[]>([])

 get newMessages() {
    return this.newMessages$.asObservable();
  }

  private async subscribeToNewMessages() {


    this.supabase
      .channel('public:chats')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chats' },
        (payload) => {
          console.log('New message:', payload);
          this.newMessages$.next([...this.newMessages$.value, payload.new]);
        }
      )
      .subscribe();
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

  async deleteChat(id: string){
    try{
      const data = await this.supabase.from('chats').delete().eq('id', id);
      return data;
    }catch(err){
      throw err;
    }
  }

}
