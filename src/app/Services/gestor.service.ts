import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor() { }

  private idSelecionado!: number;
  private transporteAdicionado!: boolean;
  private servicoAdicionado!: boolean;
  private messageErro!: string;

  getIdSelecionado(){
    return this.idSelecionado;
  }

  setIdSelecionado(id: number){
    this.idSelecionado = id;
  }

  getMessageErro(){
    return this.messageErro;
  }

  setMessageErro(erro: string){
    this.messageErro = erro;
  }

  getTransporteAdicionado(){
    return this.transporteAdicionado;
  }

  setTransporteAdicionado(bool: boolean){
    this.transporteAdicionado = bool;
  }

  getServicoAdicionado(){
    return this.servicoAdicionado;
  }

  setServicoAdicionado(bool: boolean){
    this.servicoAdicionado = bool;
  }
}
