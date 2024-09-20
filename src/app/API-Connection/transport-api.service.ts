import { Injectable } from '@angular/core';
import { Transport } from '../Models/Transporte';
import { Observable } from 'rxjs';
import { BaseServiceAPIService } from './base-service-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransportAPIService extends BaseServiceAPIService implements TransportAPIService {
  private urlTransport = 'https://localhost:7068/api/Transporte';

  criarNovoTransporte(body: Transport): Observable<any> {
    return this.post<any>(`${this.urlTransport}`, body);
  }

  getAllTransporte(): Observable<Transport[]> {
    return this.get<Transport[]>(`${this.urlTransport}`);
  }
}
