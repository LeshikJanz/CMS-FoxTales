import { TestBed, inject } from '@angular/core/testing';
import { ResponseOptions, Response, Http, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IUser } from './user.interface';
import { UserService } from './user.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        UserService
      ]
    });
  });
});
