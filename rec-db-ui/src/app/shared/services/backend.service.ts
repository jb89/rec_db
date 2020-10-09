import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quelle } from '../models/quelle';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = `localhost:8000/db_access`;

  constructor(private http: HttpClient) { }

getQuellen(name: string): Observable<Quelle[]> {
  return this.http.get<Quelle[]>(`${this.url}/get_quelle/${name}/`);
}

}
