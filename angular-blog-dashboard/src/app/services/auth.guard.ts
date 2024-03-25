import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedInGaurd) {
    return true;
  } else {
    inject(ToastrService).warning(
      'You do not have permission to access this page.'
    );
    inject(Router).navigate(['/login']);
    return false;
  }
};
