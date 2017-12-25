import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // const copiedReq = req.clone({headers: req.headers.set('', '')});
    // const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
    return this.store.select('auth')
    .take(1)
    .switchMap((authState: fromAuth.State) => {
      // tslint:disable-next-line:no-shadowed-variable
      const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
      return next.handle(copiedReq);
    });
    // return null;
  }
}
