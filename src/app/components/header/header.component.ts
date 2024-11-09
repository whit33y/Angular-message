import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private auth = inject(AuthService);

  constructor(private router: Router) {}

  isUserLoggedIn = false;
  ngOnInit() {
    this.isUserLoggedIn = this.auth.isLoggedIn;
  }

  async logout() {
    this.auth
      .signOut()
      .then(() => {
        localStorage.removeItem('session');
        this.router.navigate(['/login']);
        this.isUserLoggedIn = false;
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
