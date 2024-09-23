import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListagemComponent } from './UI/listagem/listagem.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListagemComponent,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'segimob-transportadora';
  constructor(private messageService: MessageService) {}
}
