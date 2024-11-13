import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  constructor(private router: Router, private _ngZone: NgZone) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem('session', JSON.stringify(session?.user));
      }

      if (session?.user) {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;
    return user === 'undefined' ? false : true;
  }

  isUserLogged(): boolean{
    return !!localStorage.getItem('session');
  }

  get loggedUserId(): string{
    const user = localStorage.getItem('session') as string;
    return user;
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
