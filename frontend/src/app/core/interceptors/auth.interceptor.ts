import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toastr/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); 
  const toastr = inject(ToastService); 
  const token = localStorage.getItem('token');

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        const msg = error?.error?.message || 'Unauthorized';
        toastr.showsWarningMsg(msg); 

        router.navigate(['/login']); 
      }

      return throwError(() => error);
    })
  );
};