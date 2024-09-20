import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {...appConfig, providers:[ 
  importProvidersFrom(BrowserAnimationsModule), 
  provideAnimationsAsync(), 
  provideHttpClient(),
  importProvidersFrom(ToastModule),
  MessageService ]})
  .catch((err) => console.error(err));
