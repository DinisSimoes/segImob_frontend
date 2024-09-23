import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TransportAPIService } from './transport-api.service';
import { Transport } from '../Models/Transporte';

describe('TransportAPIService', () => {
  let service: TransportAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransportAPIService],
    });

    service = TestBed.inject(TransportAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar um novo transporte', () => {
    const mockTransport: Transport = {
      id: 1,
      nome: 'Transporte 1',
      custoPorMetroCubico: 10,
    };

    service.criarNovoTransporte(mockTransport).subscribe((response) => {
      expect(response).toBe(mockTransport);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Transporte');
    expect(req.request.method).toBe('POST');
    req.flush(mockTransport); // Simula a resposta
  });

  it('deve retornar todos os transportes', () => {
    const mockTransportes: Transport[] = [
      { id: 1, nome: 'Transporte 1', custoPorMetroCubico: 10 },
      { id: 2, nome: 'Transporte 2', custoPorMetroCubico: 20 },
    ];

    service.getAllTransporte().subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(mockTransportes);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/Transporte');
    expect(req.request.method).toBe('GET');
    req.flush(mockTransportes);
  });
});
