import { environment } from './../../environments/environment.prod';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RestInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq;

    if (req.headers.has('SKIP_INTERCEPTOR')) {
      apiReq = req.clone({
        headers: req.headers.delete('SKIP_INTERCEPTOR')
      });
      return next.handle(apiReq);
    }

    apiReq = req.clone({
      url: `${environment.apiBaseURL}/api/${req.url}`
    });
    return next.handle(apiReq);
  }
}
