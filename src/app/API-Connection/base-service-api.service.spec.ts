import { TestBed } from '@angular/core/testing';

import { BaseServiceAPIService } from './base-service-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BaseServiceAPIService', () => {
  let service: BaseServiceAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseServiceAPIService]
    });

    service = TestBed.inject(BaseServiceAPIService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve realizar uma requisição GET', () => {
    const mockData = { id: 1, nome: 'Teste' };

    service.get<any>('https://localhost:7068/api/teste').subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/teste');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('deve realizar uma requisição POST', () => {
    const mockData = { id: 1, nome: 'Teste' };

    service.post<any>('https://localhost:7068/api/teste', mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/teste');
    expect(req.request.method).toBe('POST');
    req.flush(mockData);
  });

  it('deve realizar uma requisição PUT', () => {
    const mockData = { id: 1, nome: 'Teste Atualizado' };

    service.put<any>('https://localhost:7068/api/teste', mockData).subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://localhost:7068/api/teste');
    expect(req.request.method).toBe('PUT');
    req.flush(mockData);
  });
});


