import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private routeSubscription: Subscription | any;

  constructor(private router: Router) {}

  isUserLoggedIn = false;
  ngOnInit() {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isUserLoggedIn = this.auth.isUserLogged();
    });
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

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
