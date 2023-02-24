import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PoNotificationService } from '@po-ui/ng-components';

import { LoadingService } from '../services/loading.service';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private _loading: LoadingService,
    private poNotificationService: PoNotificationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, req.url);
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            this._loading.setLoading(false, req.url);
            const message =
              req.method === 'POST'
                ? 'Salvo com sucesso!'
                : 'Alteração salva com sucesso!';
            if (req.method !== 'GET') {
              this.poNotificationService.success(message);
            }
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this._loading.setLoading(false, req.url);
            this.poNotificationService.error(err.error.message);
          } catch (e) {
            this._loading.setLoading(false, req.url);
            this.poNotificationService.error('An error occurred');
          }
          //log error
        }
        return of(err);
      })
    );
  }
}
