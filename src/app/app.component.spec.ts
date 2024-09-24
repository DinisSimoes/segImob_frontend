import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListagemComponent } from './UI/listagem/listagem.component';

describe('AppComponent', () => {
  let fixture: any;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ListagemComponent,
        RouterOutlet,
        ToastModule,
        ButtonModule,
        RippleModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it(`deve ter o titulo 'segimob-transportadora'`, () => {
    expect(component.title).toEqual('segimob-transportadora');
  });

  it('deve injetar MessageService', () => {
    const messageService = TestBed.inject(MessageService);
    expect(messageService).toBeTruthy();
  });
});
