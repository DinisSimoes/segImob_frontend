import { Observable } from 'rxjs';
import { Transport } from '../Models/Transporte';

export interface ITransportAPI {
  criarNovoTransporte(body: Transport): Observable<any>;
  getAllTransporte(): Observable<Transport[]>;
}