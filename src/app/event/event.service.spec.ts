import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ITag } from './tag.interface';
import { EventService } from './event.service';
import { MOCK_TAGS } from './tag.mock';

describe('EventService', () => {
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
        EventService
      ]
    });
  });

  it('should create an instance', inject([EventService], (eventService: EventService) => {
    expect(eventService).toBeTruthy();
  }));

  it('should return all tags', inject([MockBackend, EventService],
    (mockBackend: MockBackend, eventService: EventService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_TAGS
        });

        connection.mockRespond(new Response(options));
      });

      eventService.getTags()
        .subscribe((tags: ITag[]) => {
          expect(tags).toBe(MOCK_TAGS);
        });
    }));
});
