import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { MOCK_USERS, MOCK_USER } from './user.mock';

describe('UserService', () => {
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
        UserService
      ]
    });
  });

  it('should create an instance', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should return all users', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: MOCK_USERS
      });

      connection.mockRespond(new Response(options));
    });

    userService.getUsers()
      .subscribe((users: IUser[]) => {
        expect(users).toBe(MOCK_USERS);
      });
  }));

  it('should return user by id', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_USER
        });

        connection.mockRespond(new Response(options));
      });

      userService.getUser('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((user: IUser) => {
          expect(user).toBe(MOCK_USER);
        });
    }));
});
