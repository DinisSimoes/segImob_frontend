import { Injectable } from '@angular/core';
import { BaseServiceAPIService } from './base-service-api.service';
import { IServicoServiceAPI } from '../Interfaces/IServiceAPI';
import { Observable } from 'rxjs';
import { Servico } from '../Models/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoAPIService extends BaseServiceAPIService implements IServicoServiceAPI {
  private urlServico = 'https://localhost:7068/api/Servico';

  criarNovoServico(body: Servico): Observable<any> {
    return this.post<any>(`${this.urlServico}`, body);
  }

  alterarServico(id: number, body: Servico): Observable<any> {
    return this.put<any>(`${this.urlServico}/${id}`, body);
  }

  getAllServico(): Observable<Servico[]> {
    return this.get<Servico[]>(`${this.urlServico}`);
  }

  getServico(id: number): Observable<Servico> {
    return this.get<Servico>(`${this.urlServico}/${id}`);
  }
}
