import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { GestorService } from '../../Services/gestor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicoAPIService } from '../../API-Connection/servico-api.service';
import { TransportAPIService } from '../../API-Connection/transport-api.service';
import { Transport } from '../../Models/Transporte';
import { Servico } from '../../Models/Servico';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  transportes: Transport[] = [];
  servico: Servico = new Servico();
  estados: string[] = ['Ativo', 'Espera Envio', 'Enviado', 'Concluido'];
  isEdit = false;
  isNotCompleted = false;
  transportSelecionado!: Transport;

  constructor(
    private apiServico: ServicoAPIService,
    private apiTransporte: TransportAPIService,
    private gestor: GestorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    const idSelecionado = this.gestor.getIdSelecionado();
    if (idSelecionado) {
      this.loadServico(idSelecionado);
    }
    this.loadTransportes();
  }

  private loadServico(id: number) {
    this.apiServico.getServico(id).subscribe({
      next: (data: Servico) => {
        this.servico = data;
        this.isEdit = true;
        this.isNotCompleted = this.servico.status === 'Concluido';
      },
      error: (error) => this.handleError(error),
    });
  }

  private loadTransportes() {
    this.apiTransporte.getAllTransporte().subscribe({
      next: (data: Transport[]) => {
        this.transportes = data;
      },
      error: (error) => this.handleError(error),
    });
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  gravarServico() {
    this.servico.id ? this.alterar() : this.criar();
  }

  onChange(event: any) {
    this.servico.transporteId = event.id;
    this.transportSelecionado = event;
    this.calculaPreco();
  }

  onSearchChange(event: any) {
    console.log(event);
    console.log(this.servico.altura);
    this.calculaPreco();
  }

  private calculaPreco() {
    let largura = this.servico.largura ?? 0;
    let comprimento = this.servico.comprimento ?? 0;
    let altura = this.servico.altura ?? 0;
    let precoUnidade = this.transportSelecionado?.custoPorMetroCubico ?? 0;

    this.servico.custoTotal = largura * comprimento * altura * precoUnidade;
  }

  private criar() {
    this.apiServico.criarNovoServico(this.servico).subscribe({
      next: () => {
        this.gestor.setServicoAdicionado(true);
        console.log('Serviço criado com sucesso.');
      },
      error: (error: HttpErrorResponse) => this.handleError(error),
    });
  }

  private alterar() {
    this.apiServico.alterarServico(this.servico.id, this.servico).subscribe({
      next: () => {
        this.gestor.setServicoAdicionado(true);
        console.log('Serviço atualizado com sucesso.');
      },
      error: (error: HttpErrorResponse) => this.handleError(error),
    });
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessages = Object.values(error.error.errors).flat().join('\n');
    this.gestor.setServicoAdicionado(false);
    this.gestor.setMessageErro(errorMessages);
    console.error('Erro:', errorMessages);
  }
}
