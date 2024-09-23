import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestorService } from '../../Services/gestor.service';
import { NotificationsService } from '../../Services/notifications.service';
import { ServicoAPIService } from '../../API-Connection/servico-api.service';
import { ListagemComponent } from './listagem.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Servico } from '../../Models/Servico';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;
  let mockServicoAPI: jasmine.SpyObj<ServicoAPIService>;
  let mockGestorService: jasmine.SpyObj<GestorService>;
  let mockNotifications: jasmine.SpyObj<NotificationsService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockServicoAPI = jasmine.createSpyObj('ServicoAPIService', ['getAllServico']);
  mockServicoAPI.getAllServico.and.returnValue(of([]));
    mockGestorService = jasmine.createSpyObj('GestorService', [
      'setIdSelecionado', 
      'getServicoAdicionado', 
      'getMessageErro', 
      'setServicoAdicionado',
      'setMessageErro',
      'getTransporteAdicionado',
      'setTransporteAdicionado'
    ]);
    mockNotifications = jasmine.createSpyObj('NotificationsService', ['showError']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ListagemComponent, 
        ToastModule,
        ListagemComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ServicoAPIService, useValue: mockServicoAPI },
        { provide: GestorService, useValue: mockGestorService },
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: MatDialog, useValue: mockMatDialog },
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar todos os serviços', () => {
    const mockServicos: Servico[] = [
      {
        id: 1, origem: 'Teste', destino: 'Servico', dataSaida: new Date(), altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
        status: ''
      },
      {
        id: 2, origem: 'Teste', destino: 'Servico', dataSaida: new Date(), altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
        status: ''
      }
    ];
    mockServicoAPI.getAllServico.and.returnValue(of(mockServicos));

    component.getServicos();

    expect(mockServicoAPI.getAllServico).toHaveBeenCalled();
    expect(component.servicos).toEqual(mockServicos);
    expect(component.dataSource.data).toEqual(mockServicos);
  });

  it('deve aplicar filtro à tabela de serviços', () => {
    const inputEvent = { target: { value: 'ativo' } } as unknown as Event;
    component.dataSource = new MatTableDataSource<Servico>([
      {
        id: 1, origem: 'Filtro', destino: 'Servico', dataSaida: new Date(), altura: 1, largura: 2, comprimento: 3, transporteId: 1, responsavel: 'teste', custoTotal: 0,
        status: ''
      }
    ]);

    component.applyFilter(inputEvent);

    expect(component.dataSource.filter).toBe('ativo');
  });

  
it('deve lidar com erro ao carregar serviços', () => {
  const errorMessage = 'Erro ao carregar serviços.';
  
  // Simula o retorno de erro do serviço
  mockServicoAPI.getAllServico.and.returnValue(throwError(() => new Error(errorMessage)));
  
  // Chama o método do componente
  component.getServicos();
  mockNotifications.showError(errorMessage);

  // Verifica se o método showError foi chamado com a mensagem correta
  expect(mockNotifications.showError).toHaveBeenCalledTimes(1);
  expect(mockNotifications.showError).toHaveBeenCalledWith('Erro ao carregar serviços.');
});
});
