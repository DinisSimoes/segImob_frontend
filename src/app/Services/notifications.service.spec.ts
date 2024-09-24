import { TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';
import { MessageService } from 'primeng/api';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        NotificationsService,
        { provide: MessageService, useValue: spy },
      ],
    });

    service = TestBed.inject(NotificationsService);
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar messageService.add com mensagem de sucesso', () => {
    const message = 'Success message';
    service.showSuccess(message);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  });

  it('deve chamar messageService.add com mensagem de erro', () => {
    const message = 'Error message';
    service.showError(message);
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  });
});
