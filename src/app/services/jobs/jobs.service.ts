import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJobs, Jobs } from '../../models/jobs.interface';
import { IResponse } from '../../models/response.interface';

@Injectable()
export class JobsServices {
  constructor(private http: HttpClient) {}

  get(): Observable<IJobs[]> {
    return this.http
      .get('http://localhost:3000/jobs')
      .pipe(
        map((response) =>
          (<IResponse>response).data.map((eco: IJobs) => new Jobs(eco))
        )
      );
  }
}
