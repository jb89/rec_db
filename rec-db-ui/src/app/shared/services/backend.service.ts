import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quelle } from '../models/quelle';
import { Zutat } from '../models/zutat';
import { Rezept } from '../models/rezept';
import { RezeptZutatQuelle } from '../models/rezept-zutat-quelle';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = `http://localhost:8000/db_access`;

  constructor(private http: HttpClient) { }

  getQuellen(): Observable<Quelle[]> {
    return this.http.get<Quelle[]>(`${this.url}/get_quellen`);
  }

  createQuelle(quelleNameInput: string, quelleAutorInput: string): Observable<Quelle> {
    return this.http.get<Quelle>(`${this.url}/put_quelle/${quelleNameInput}/${quelleAutorInput}`);
  }

  getZutaten(): Observable<Zutat[]> {
    return this.http.get<Zutat[]>(`${this.url}/get_zutaten`);
  }

  createZutat(zutatName: string): Observable<Zutat> {
    return this.http.get<Quelle>(`${this.url}/put_zutat/${zutatName}`);
  }

  getRezepteForQuelleAndZutat(quelleId: number, zutatId: number): Observable<RezeptZutatQuelle[]> {
    return this.http.get<RezeptZutatQuelle[]>(`${this.url}/get_rezepte_for_quelle_and_zutat/${quelleId}/${zutatId}`);
  }

  getRezepte(): Observable<Rezept[]> {
    return this.http.get<Rezept[]>(`${this.url}/get_rezepte`);
  }
}