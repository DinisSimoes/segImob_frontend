import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NovoTransporteComponent } from '../novo-transporte/novo-transporte.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { GestorService } from '../../Services/gestor.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NotificationsService } from '../../Services/notifications.service';
import { ServicoAPIService } from '../../API-Connection/servico-api.service';
import { Servico } from '../../Models/Servico';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    CommonModule, 
    MatInputModule, 
    MatButtonModule, 
    MatInputModule, 
    MatDialogModule, 
    ToastModule, 
    ButtonModule, 
    RippleModule
  ],
  providers: [DatePipe, NotificationsService],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent {
  servicos!: Servico[];
  displayedColumns: string[] = ['btnEdit', 'status', 'responsavel', 'dataSaida', 'origem', 'destino'];
  dataSource = new MatTableDataSource<Servico>(this.servicos);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private api: ServicoAPIService, 
    private gestor:GestorService, 
    private notifications: NotificationsService
  ){
    this.gestor.setIdSelecionado(0);
    this.getServicos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getServicos() {
    this.api.getAllServico().subscribe({
      next: (data: Servico[]) => {
        this.servicos = this.dataSource.data = data;
      },
      error: (error) => 
        {
          console.log('Erro GetServicos capturado: ' + error);
          this.notifications.showError('Erro ao carregar serviços.');}
    });
  }

  editar(id: number) {
    this.gestor.setIdSelecionado(id);
    const dialogRef = this.dialog.open(FormularioComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (this.gestor.getServicoAdicionado()) {
        this.notifications.showSuccess('Serviço atualizado');
        this.gestor.setServicoAdicionado(false);
        this.getServicos();
      } else {
        this.notifications.showError(this.gestor.getMessageErro());
        this.gestor.setMessageErro('');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adicionarTransporte() {
    const dialogRef = this.dialog.open(NovoTransporteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (this.gestor.getTransporteAdicionado()) {
        this.notifications.showSuccess('Novo Transporte adicionado');
        this.gestor.setTransporteAdicionado(false);
      } else {
        this.notifications.showError(this.gestor.getMessageErro());
        this.gestor.setMessageErro('');
      }
    });
  }

  adicionarServico() {
    this.gestor.setIdSelecionado(0);
    const dialogRef = this.dialog.open(FormularioComponent,{width: '90vw'});
    dialogRef.afterClosed().subscribe(result => {
      if (this.gestor.getServicoAdicionado()) {
        this.notifications.showSuccess('Novo Serviço adicionado');
        this.gestor.setServicoAdicionado(false);
        this.getServicos();
      } else {
        this.notifications.showError(this.gestor.getMessageErro());
        this.gestor.setMessageErro('');
      }
    });
  }
}
