import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IClient, IClientList } from './client.interface';
import { IClientLicense } from './client-license.interface';
import { ClientService } from './client.service';
import { MOCK_CLIENTS, MOCK_CLIENT, MOCK_CLIENTS_FILTER } from './client.mock';
import { MOCK_CLIENT_LICENSE } from './client-license.mock';

describe('ClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        ClientService
      ]
    });
  });

  it('should create an instance', inject([ClientService], (clientService: ClientService) => {
    expect(clientService).toBeTruthy();
  }));

  it('should return all clients', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: MOCK_CLIENTS
      });

      connection.mockRespond(new Response(options));
    });

    clientService.getClients(MOCK_CLIENTS_FILTER)
      .subscribe((clients: IClientList) => {
        expect(clients).toBe(MOCK_CLIENTS);
      });
  }));

  it('should return client by id', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_CLIENT,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      clientService.getClient('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((client: IClient) => {
          expect(client).toBe(MOCK_CLIENT);
        });
    }));

  it('should add new client', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_CLIENT,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      clientService.addClient(MOCK_CLIENT)
        .subscribe((client: IClient) => {
          expect(client).toBe(MOCK_CLIENT);
        });
    }));

  it('should update client', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_CLIENT,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      clientService.updateClient(MOCK_CLIENT)
        .subscribe((client: IClient) => {
          expect(client).toBe(MOCK_CLIENT);
        });
    }));

  it('should archive client by id', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          status: 204
        });

        connection.mockRespond(new Response(options));
      });

      clientService.archiveClient('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((response: Response) => {
          expect(response.status).toBe(204);
        });
    }));

  it('should unarchive client by id', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          status: 204
        });

        connection.mockRespond(new Response(options));
      });

      clientService.unarchiveClient('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((response: Response) => {
          expect(response.status).toBe(204);
        });
    }));

  it('should return all client licenses', inject([MockBackend, ClientService],
    (mockBackend: MockBackend, clientService: ClientService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_CLIENT_LICENSE
        });

        connection.mockRespond(new Response(options));
      });

      clientService.getClientLicenses()
        .subscribe((licenses: IClientLicense[]) => {
          expect(licenses).toBe(MOCK_CLIENT_LICENSE);
        });
    }));
});
