import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  get user() { 
    return this.authService.user;
  }

  constructor(
    private router: Router, 
    private authService: AuthService
    ) { }

  logout(): void {
    this.router.navigateByUrl('/auth');
    this.authService.logout()
  }

}
