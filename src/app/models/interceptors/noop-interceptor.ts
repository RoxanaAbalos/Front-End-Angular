import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

constructor(public authService:AuthService){

}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        let authToken = this.authService.token;
    if (authToken != null) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
          });
          return next.handle(authReq);
    }
  
    return next.handle(req);
  }
}