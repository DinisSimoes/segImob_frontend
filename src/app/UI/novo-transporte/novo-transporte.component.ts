import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Transport } from '../../Models/Transporte';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { NotificationsService } from '../../Services/notifications.service';
import { GestorService } from '../../Services/gestor.service';
import { TransportAPIService } from '../../API-Connection/transport-api.service';

@Component({
  selector: 'app-novo-transporte',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatInputModule, 
    FormsModule,
    MatDialogModule, 
    ToastModule, 
    ButtonModule, 
    RippleModule
  ],
  providers: [NotificationsService],
  templateUrl: './novo-transporte.component.html',
  styleUrl: './novo-transporte.component.css'
})
export class NovoTransporteComponent {

  transporte!: Transport;

  constructor(
    private api: TransportAPIService, 
    private gestor: GestorService
  ) { 
    this.transporte = new Transport();
  }

  gravarTransporte() {
    this.api.criarNovoTransporte(this.transporte).subscribe({
      next: () => {
        this.gestor.setTransporteAdicionado(true);
      },
      error: (error) => {
        this.gestor.setTransporteAdicionado(false);
        this.gestor.setMessageErro(error.error.Message);
      }
    });
  }
}
