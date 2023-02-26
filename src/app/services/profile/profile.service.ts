import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProfile, Profile } from '../../models/profile.interface';

const URL = 'http://localhost:3000/profile';

@Injectable()
export class ProfileServices {
  constructor(private http: HttpClient) {}

  get(): Observable<IProfile[]> {
    return this.http
      .get(URL)
      .pipe(
        map((response) =>
          (<IProfile[]>response).map((eco: IProfile) => new Profile(eco))
        )
      );
  }

  post(data: any): Observable<IProfile[]> {
    return this.http.post(URL, data).pipe(map((response) => []));
  }

  delete(idProfile: number): Observable<IProfile[]> {
    return this.http.delete(`${URL}/${idProfile}`).pipe(map((response) => []));
  }

  getById(idProfile: number): Observable<IProfile> {
    return this.http
      .get(`${URL}/${idProfile}`)
      .pipe(map((response) => response as IProfile));
  }

  put(data: any, idProfile: number) {
    return this.http
      .put(`${URL}/${idProfile}`, data)
      .pipe(map((response) => []));
  }
}
