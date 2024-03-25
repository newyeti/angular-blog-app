import { Injectable, inject } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  signInWithCredential,
  authState,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGaurd: boolean = false;

  constructor(private toastr: ToastrService, private router: Router) {}

  async login(email: string, password: string) {
    const authCredential = EmailAuthProvider.credential(email, password);
    try {
      const userCredential = await signInWithCredential(
        this.auth,
        authCredential
      );

      if (userCredential) {
        this.loggedIn.next(true);
        this.isLoggedInGaurd = true;
        this.toastr.success('Logged In Successfully');
        this.loadUser();
        this.router.navigate(['']);
      }
    } catch (error) {
      this.toastr.warning('Logged In Failed');
    }
  }

  loadUser() {
    authState(this.auth).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    signOut(this.auth).then(() => {
      this.loggedIn.next(false);
      this.isLoggedInGaurd = false;
      this.toastr.success('User logged out successfully');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
