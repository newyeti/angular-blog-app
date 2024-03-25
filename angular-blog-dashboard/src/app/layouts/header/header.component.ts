import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userEmail!: string;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user') || '""').email;
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onSignOut() {
    this.authService.logOut();
  }
}
