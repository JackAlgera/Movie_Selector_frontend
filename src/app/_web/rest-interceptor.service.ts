import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RestInterceptorService implements HttpInterceptor {

  private backendURL = 'http://localhost:8080/api';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq;

    if (req.headers.has('SKIP_INTERCEPTOR')) {
      apiReq = req.clone({
        headers: req.headers.delete('SKIP_INTERCEPTOR')
      });
      return next.handle(apiReq);
    }

    apiReq = req.clone({
      url: `${this.backendURL}/${req.url}`
    });
    return next.handle(apiReq);
  }
}
