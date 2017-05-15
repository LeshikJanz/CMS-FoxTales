import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IUser, IUserList } from './user.interface';
import { IUserRole } from './user-role.interface';
import { UserService } from './user.service';
import { MOCK_USERS, MOCK_USER, MOCK_USERS_FILTER } from './user.mock';
import { MOCK_USER_ROLE } from './user-role.mock';

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

    userService.getUsers(MOCK_USERS_FILTER)
      .subscribe((users: IUserList) => {
        expect(users).toBe(MOCK_USERS);
      });
  }));

  it('should return user by id', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_USER,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      userService.getUser('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((user: IUser) => {
          expect(user).toBe(MOCK_USER);
        });
    }));

  it('should add new user', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_USER,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      userService.addUser(MOCK_USER)
        .subscribe((user: IUser) => {
          expect(user).toBe(MOCK_USER);
        });
    }));

  it('should update user', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_USER,
          status: 200
        });

        connection.mockRespond(new Response(options));
      });

      userService.updateUser(MOCK_USER)
        .subscribe((user: IUser) => {
          expect(user).toBe(MOCK_USER);
        });
    }));

  it('should archive user by id', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          status: 204
        });

        connection.mockRespond(new Response(options));
      });

      userService.archiveUser('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((response: Response) => {
          expect(response.status).toBe(204);
        });
    }));

  it('should unarchive user by id', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          status: 204
        });

        connection.mockRespond(new Response(options));
      });

      userService.unarchiveUser('2eb5c2ff-44f8-4664-8a67-458a39ff4e9d')
        .subscribe((response: Response) => {
          expect(response.status).toBe(204);
        });
    }));

  it('should return all user roles', inject([MockBackend, UserService],
    (mockBackend: MockBackend, userService: UserService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: MOCK_USER_ROLE
        });

        connection.mockRespond(new Response(options));
      });

      userService.getUserRoles()
        .subscribe((roles: IUserRole[]) => {
          expect(roles).toBe(MOCK_USER_ROLE);
        });
    }));
});
