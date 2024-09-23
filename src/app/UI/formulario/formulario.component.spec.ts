import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormularioComponent } from './formulario.component';
import { GestorService } from '../../Services/gestor.service';
import { ServicoAPIService } from '../../API-Connection/servico-api.service';
import { TransportAPIService } from '../../API-Connection/transport-api.service';
import { Transport } from '../../Models/Transporte';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Servico } from '../../Models/Servico';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let mockServicoAPI: jasmine.SpyObj<ServicoAPIService>;
  let mockTransportAPI: jasmine.SpyObj<TransportAPIService>;
  let mockGestorService: jasmine.SpyObj<GestorService>;

  beforeEach(async () => {
    mockServicoAPI = jasmine.createSpyObj('ServicoAPIService', [
      'getAllServico',
    ]);
    mockServicoAPI = jasmine.createSpyObj('ServicoAPIService', [
      'getAllServico',
      'getServico',
      'criarNovoServico',
      'alterarServico',
    ]);
    mockTransportAPI = jasmine.createSpyObj('TransportAPIService', [
      'getAllTransporte',
    ]);
    mockGestorService = jasmine.createSpyObj('GestorService', [
      'getIdSelecionado',
      'setServicoAdicionado',
      'setMessageErro',
    ]);

    mockServicoAPI.getAllServico.and.returnValue(of([]));
    mockTransportAPI.getAllTransporte.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormularioComponent,
        FormsModule,
        FormularioComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ServicoAPIService, useValue: mockServicoAPI },
        { provide: TransportAPIService, useValue: mockTransportAPI },
        { provide: GestorService, useValue: mockGestorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o serviço selecionado ao inicializar', () => {
    const mockServico: Servico = {
      id: 1,
      origem: 'Criacao',
      destino: 'Servico',
      dataSaida: Date.prototype,
      altura: 1,
      largura: 2,
      comprimento: 3,
      transporteId: 1,
      responsavel: 'teste',
      custoTotal: 0,
      status: '',
    };
    mockGestorService.getIdSelecionado.and.returnValue(1);
    mockServicoAPI.getServico.and.returnValue(of(mockServico));

    component.ngOnInit();

    expect(mockGestorService.getIdSelecionado).toHaveBeenCalled();
    expect(mockServicoAPI.getServico).toHaveBeenCalledWith(1);
  });

  it('deve carregar os transportes ao inicializar', () => {
    const mockTransportes: Transport[] = [
      {
        id: 1,
        nome: 'Transporte 1',
        custoPorMetroCubico: 100,
      },
    ];
    const mockServico: Servico = {
      id: 1,
      origem: 'Criacao',
      destino: 'Servico',
      dataSaida: Date.prototype,
      altura: 1,
      largura: 2,
      comprimento: 3,
      transporteId: 1,
      responsavel: 'teste',
      custoTotal: 0,
      status: '',
    };

    mockTransportAPI.getAllTransporte.and.returnValue(of(mockTransportes));
    mockServicoAPI.getServico.and.returnValue(of(mockServico));

    component.ngOnInit();

    expect(mockTransportAPI.getAllTransporte).toHaveBeenCalled();
    expect(component.transportes).toEqual(mockTransportes);
  });

  it('deve carregar o serviço selecionado ao inicializar', () => {
    const mockServico: Servico = {
      id: 1,
      origem: 'Criacao',
      destino: 'Servico',
      dataSaida: Date.prototype,
      altura: 1,
      largura: 2,
      comprimento: 3,
      transporteId: 1,
      responsavel: 'teste',
      custoTotal: 0,
      status: '',
    };
    mockGestorService.getIdSelecionado.and.returnValue(1);
    mockServicoAPI.getServico.and.returnValue(of(mockServico));

    component.ngOnInit();

    expect(mockGestorService.getIdSelecionado).toHaveBeenCalled();
    expect(mockServicoAPI.getServico).toHaveBeenCalledWith(1);
    expect(component.servico).toEqual(mockServico);
    expect(component.isEdit).toBeTrue();
  });

  it('deve alterar um serviço existente', () => {
    const mockServico: Servico = {
      id: 1,
      origem: 'Atualizacao',
      destino: 'Servico',
      dataSaida: Date.prototype,
      altura: 1,
      largura: 2,
      comprimento: 3,
      transporteId: 1,
      responsavel: 'teste',
      custoTotal: 0,
      status: '',
    };
    mockServicoAPI.alterarServico.and.returnValue(of(mockServico));

    component.servico = mockServico;
    component.gravarServico();

    expect(mockServicoAPI.alterarServico).toHaveBeenCalledWith(1, mockServico);
    expect(mockGestorService.setServicoAdicionado).toHaveBeenCalledWith(true);
  });

  it('deve filtrar datas menores que a atual', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isTodayValid = component.dateFilter(today);
    const isTomorrowValid = component.dateFilter(tomorrow);

    expect(isTodayValid).toBeTrue();
    expect(isTomorrowValid).toBeTrue();
  });
});
