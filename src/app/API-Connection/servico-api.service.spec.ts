import { TestBed } from '@angular/core/testing';

import { ServicoAPIService } from './servico-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Servico } from '../Models/Servico';

describe('ServicoAPIService', () => {
  let service: ServicoAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicoAPIService]
    });

    service = TestBed.inject(ServicoAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar um novo serviço', () => {
    const mockServico:Servico = {
      id: 1, origem: 'Criacao', destino: 'Servico', dataSaida: Date.prototype, altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
      status: ''
    };

    service.criarNovoServico(mockServico).subscribe(response => {
      expect(response).toBe(mockServico);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Servico');
    expect(req.request.method).toBe('POST');
    req.flush(mockServico);
  });

  it('deve alterar um serviço', () => {
    const mockServico:Servico = {
      id: 1, origem: 'Serviço ', destino: 'Atualizado', dataSaida: Date.prototype, altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
      status: ''
    };

    service.alterarServico(1, mockServico).subscribe(response => {
      expect(response).toBe(mockServico);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Servico/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockServico);
  });

  it('deve retornar todos os serviços', () => {
    const mockServicos = [
      {
        id: 1, origem: 'Serviço 1', destino: 'teste', dataSaida: Date.prototype, altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
        status: ''
      },
      {
        id: 2, origem: 'Serviço 2', destino: 'teste', dataSaida: Date.prototype, altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
        status: ''
      }
    ];

    service.getAllServico().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response).toEqual(mockServicos);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Servico');
    expect(req.request.method).toBe('GET');
    req.flush(mockServicos);
  });

  it('deve retornar um serviço pelo ID', () => {
    const mockServico = {
      id: 1, origem: 'Serviço 1', destino: 'teste', dataSaida: Date.prototype, altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
      status: ''
    };

    service.getServico(1).subscribe(response => {
      expect(response).toEqual(mockServico);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Servico/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockServico);
  });

});
