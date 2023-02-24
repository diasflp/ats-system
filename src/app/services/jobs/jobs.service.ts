import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IJobs, Jobs } from '../../models/jobs.interface';

const URL = 'http://localhost:3000/jobs';

@Injectable()
export class JobsServices {
  constructor(private http: HttpClient) {}

  get(): Observable<IJobs[]> {
    return this.http
      .get(URL)
      .pipe(
        map((response) =>
          (<IJobs[]>response).map((eco: IJobs) => new Jobs(eco))
        )
      );
  }

  post(data: any): Observable<IJobs[]> {
    return this.http.post(URL, data).pipe(map((response) => []));
  }

  delete(idJob: number): Observable<IJobs[]> {
    return this.http.delete(`${URL}/${idJob}`).pipe(map((response) => []));
  }

  getById(idJob: number): Observable<IJobs> {
    return this.http
      .get(`${URL}/${idJob}`)
      .pipe(map((response) => response as IJobs));
  }

  put(data: any, idJob: number) {
    return this.http.put(`${URL}/${idJob}`, data).pipe(map((response) => []));
  }
}
