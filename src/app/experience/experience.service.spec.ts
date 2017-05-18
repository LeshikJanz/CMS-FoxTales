import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ITag } from './tag.interface';
import { ExperienceService } from './experience.service';
import { MOCK_TAGS } from './tag.mock';

describe('ExperienceService', () => {
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
        ExperienceService
      ]
    });
  });

  it('should create an instance', inject(
    [ExperienceService],
    (experienceService: ExperienceService) => {
    expect(experienceService).toBeTruthy();
  }));

  it('should return all tags', inject([MockBackend, ExperienceService],
    (mockBackend: MockBackend, experienceService: ExperienceService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_TAGS
        });

        connection.mockRespond(new Response(options));
      });

      experienceService.getTags()
        .subscribe((tags: ITag[]) => {
          expect(tags).toBe(MOCK_TAGS);
        });
    }));
});
