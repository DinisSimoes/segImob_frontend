import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NovoTransporteComponent } from './novo-transporte.component';
import { TransportAPIService } from '../../API-Connection/transport-api.service';
import { GestorService } from '../../Services/gestor.service';
import { Transport } from '../../Models/Transporte';
import { HttpErrorResponse } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NovoTransporteComponent', () => {
  let component: NovoTransporteComponent;
  let fixture: ComponentFixture<NovoTransporteComponent>;
  let mockTransportAPI: jasmine.SpyObj<TransportAPIService>;
  let mockGestorService: jasmine.SpyObj<GestorService>;

  beforeEach(async () => {
    mockTransportAPI = jasmine.createSpyObj('TransportAPIService', [
      'criarNovoTransporte',
    ]);
    mockGestorService = jasmine.createSpyObj('GestorService', [
      'setTransporteAdicionado',
      'setMessageErro',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatDialogModule,
        ToastModule,
        ButtonModule,
        RippleModule,
        NoopAnimationsModule,
        NovoTransporteComponent,
      ],
      providers: [
        { provide: TransportAPIService, useValue: mockTransportAPI },
        { provide: GestorService, useValue: mockGestorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o transporte como uma nova instância', () => {
    expect(component.transporte).toBeTruthy();
    expect(component.transporte).toEqual(new Transport());
  });

  it('deve criar um novo transporte', () => {
    const mockTransporte: Transport = {
      id: 1,
      nome: 'Transporte Teste',
      custoPorMetroCubico: 100,
    };
    mockTransportAPI.criarNovoTransporte.and.returnValue(of(mockTransporte));

    component.transporte = mockTransporte;
    component.gravarTransporte();

    expect(mockTransportAPI.criarNovoTransporte).toHaveBeenCalledWith(
      mockTransporte
    );
    expect(mockGestorService.setTransporteAdicionado).toHaveBeenCalledWith(
      true
    );
  });

  it('deve lidar com erro ao criar transporte', () => {
    const errorResponse = new HttpErrorResponse({
      error: { Message: 'Erro ao criar transporte' },
      status: 400,
      statusText: 'Bad Request',
    });
    mockTransportAPI.criarNovoTransporte.and.returnValue(
      throwError(() => errorResponse)
    );

    component.transporte = {
      id: 0,
      nome: 'Transporte Teste',
      custoPorMetroCubico: 100,
    };
    component.gravarTransporte();

    expect(mockTransportAPI.criarNovoTransporte).toHaveBeenCalled();
    expect(mockGestorService.setTransporteAdicionado).toHaveBeenCalledWith(
      false
    );
    expect(mockGestorService.setMessageErro).toHaveBeenCalledWith(
      'Erro ao criar transporte'
    );
  });
});
