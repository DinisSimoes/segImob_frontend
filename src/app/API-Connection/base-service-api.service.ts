import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceAPIService {
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.headers });
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.headers });
  }
}
