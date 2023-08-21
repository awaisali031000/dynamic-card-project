import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicCard } from './models/dynamic-card-model';

@Injectable({
  providedIn: 'root',
})
export class DynamicCardService {
  url: string = 'https://localhost:7155/api/DynamicCard/';

  constructor(private http: HttpClient) {}

  getAll(id: string): Observable<DynamicCard[]> {
    return this.http.get<DynamicCard[]>(`${this.url}${id}`);
  }

  addDynamicCard(dynamicCard: DynamicCard): Observable<DynamicCard> {
    console.log(dynamicCard);
    return this.http.post<DynamicCard>(this.url, dynamicCard);
  }
}
