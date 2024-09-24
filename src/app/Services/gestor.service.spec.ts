import { TestBed } from '@angular/core/testing';

import { GestorService } from './gestor.service';

describe('GestorService', () => {
  let service: GestorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('teste set and get idSelecionado', () => {
    service.setIdSelecionado(5);
    expect(service.getIdSelecionado()).toBe(5);
  });

  it('teste set and get messageErro', () => {
    service.setMessageErro('Error occurred');
    expect(service.getMessageErro()).toBe('Error occurred');
  });

  it('teste set and get transporteAdicionado', () => {
    service.setTransporteAdicionado(true);
    expect(service.getTransporteAdicionado()).toBe(true);
    service.setTransporteAdicionado(false);
    expect(service.getTransporteAdicionado()).toBe(false);
  });

  it('teste set and get servicoAdicionado', () => {
    service.setServicoAdicionado(true);
    expect(service.getServicoAdicionado()).toBe(true);
    service.setServicoAdicionado(false);
    expect(service.getServicoAdicionado()).toBe(false);
  });
});
