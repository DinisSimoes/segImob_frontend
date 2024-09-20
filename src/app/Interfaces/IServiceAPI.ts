import { Observable } from "rxjs";
import { Servico } from "../Models/Servico";

export interface IServicoServiceAPI {
    criarNovoServico(body: Servico): Observable<any>;
    alterarServico(id: number, body: Servico): Observable<any>;
    getAllServico(): Observable<Servico[]>;
    getServico(id: number): Observable<Servico>;
  }