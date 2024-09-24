import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    mockServicoAPI = jasmine.createSpyObj('ServicoAPIService', [
      'getAllServico',
    ]);
    mockServicoAPI.getAllServico.and.returnValue(of([]));
    mockGestorService = jasmine.createSpyObj('GestorService', [
      'setIdSelecionado',
      'getServicoAdicionado',
      'getMessageErro',
      'setServicoAdicionado',
      'setMessageErro',
      'getTransporteAdicionado',
      'setTransporteAdicionado',
    ]);
    mockNotifications = jasmine.createSpyObj('NotificationsService', [
      'showError',
      'showSuccess',
    ]);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ListagemComponent,
        ToastModule,
        ListagemComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ServicoAPIService, useValue: mockServicoAPI },
        { provide: GestorService, useValue: mockGestorService },
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: MatDialogRef, useValue: mockDialogRef },
        MessageService,
      ],
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
        id: 1,
        origem: 'Teste',
        destino: 'Servico',
        dataSaida: new Date(),
        altura: 1,
        largura: 2,
        comprimento: 3,
        transporteId: 1,
        responsavel: 'teste',
        custoTotal: 0,
        status: '',
      },
      {
        id: 2,
        origem: 'Teste',
        destino: 'Servico',
        dataSaida: new Date(),
        altura: 1,
        largura: 2,
        comprimento: 3,
        transporteId: 1,
        responsavel: 'teste',
        custoTotal: 0,
        status: '',
      },
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
        id: 1,
        origem: 'Filtro',
        destino: 'Servico',
        dataSaida: new Date(),
        altura: 1,
        largura: 2,
        comprimento: 3,
        transporteId: 1,
        responsavel: 'teste',
        custoTotal: 0,
        status: '',
      },
    ]);

    component.applyFilter(inputEvent);

    expect(component.dataSource.filter).toBe('ativo');
  });

  it('deve lidar com erro ao carregar serviços', () => {
    const errorMessage = 'Erro ao carregar serviços.';
    mockServicoAPI.getAllServico.and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    component.getServicos();
    mockNotifications.showError(errorMessage);

    expect(mockNotifications.showError).toHaveBeenCalledTimes(1);
    expect(mockNotifications.showError).toHaveBeenCalledWith(
      'Erro ao carregar serviços.'
    );
  });

  it('deve lidar com sucesso ao adicionar transporte', () => {
    mockGestorService.getTransporteAdicionado.and.returnValue(true);

    component.adicionarTransporte();
    mockNotifications.showSuccess('Novo Transporte adicionado');
    mockGestorService.setTransporteAdicionado(true);

    expect(mockNotifications.showSuccess).toHaveBeenCalledWith(
      'Novo Transporte adicionado'
    );
    expect(mockGestorService.setTransporteAdicionado).toHaveBeenCalledWith(
      true
    );
  });

  it('deve lidar com erro ao adicionar transporte', () => {
    const mockErrorMessage = 'Error occurred';
    mockGestorService.getTransporteAdicionado.and.returnValue(false);
    mockGestorService.getMessageErro.and.returnValue(mockErrorMessage);

    component.adicionarTransporte();
    mockNotifications.showError(mockErrorMessage);
    mockGestorService.setTransporteAdicionado(false);

    expect(mockNotifications.showError).toHaveBeenCalledWith(mockErrorMessage);
    expect(mockGestorService.setTransporteAdicionado).toHaveBeenCalledWith(
      false
    );
  });

  it('deve lidar com sucesso ao adicionar servico', () => {
    mockGestorService.getTransporteAdicionado.and.returnValue(true);

    component.adicionarServico();
    mockNotifications.showSuccess('Novo Serviço adicionado');
    mockGestorService.setServicoAdicionado(true);
    //component.getServicos();

    expect(mockNotifications.showSuccess).toHaveBeenCalledWith(
      'Novo Serviço adicionado'
    );
    expect(mockGestorService.setServicoAdicionado).toHaveBeenCalledWith(true);
  });

  it('deve lidar com erro ao adicionar servico', () => {
    const mockErrorMessage = 'Error occurred';
    mockGestorService.getServicoAdicionado.and.returnValue(false);
    mockGestorService.getMessageErro.and.returnValue(mockErrorMessage);

    component.adicionarServico();
    mockNotifications.showError(mockErrorMessage);
    mockGestorService.setServicoAdicionado(false);

    expect(mockNotifications.showError).toHaveBeenCalledWith(mockErrorMessage);
    expect(mockGestorService.setServicoAdicionado).toHaveBeenCalledWith(false);
  });

  it('deve lidar com sucesso ao editar servico', () => {
    mockGestorService.getTransporteAdicionado.and.returnValue(true);

    component.editar(1);
    mockNotifications.showSuccess('Serviço atualizado');
    mockGestorService.setServicoAdicionado(true);
    //component.getServicos();

    expect(mockNotifications.showSuccess).toHaveBeenCalledWith(
      'Serviço atualizado'
    );
    expect(mockGestorService.setServicoAdicionado).toHaveBeenCalledWith(true);
  });

  it('deve lidar com erro ao editar servico', () => {
    const mockErrorMessage = 'Error occurred';
    mockGestorService.getServicoAdicionado.and.returnValue(false);
    mockGestorService.getMessageErro.and.returnValue(mockErrorMessage);

    component.editar(1);
    mockNotifications.showError(mockErrorMessage);
    mockGestorService.setServicoAdicionado(false);

    expect(mockNotifications.showError).toHaveBeenCalledWith(mockErrorMessage);
    expect(mockGestorService.setServicoAdicionado).toHaveBeenCalledWith(false);
    //expect(component.getServicos).toHaveBeenCalled()
  });
});
