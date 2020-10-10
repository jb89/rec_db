import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quelle } from '../models/quelle';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = `http://localhost:8000/db_access`;

  constructor(private http: HttpClient) { }

getQuellen(): Observable<Quelle[]> {
  return this.http.get<Quelle[]>(`${this.url}/get_quellen`);
}

}
