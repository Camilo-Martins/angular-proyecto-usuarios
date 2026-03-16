import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Camilo',
      lastName: 'Martins',
      email: 'camilo@mail.com',
      username: 'camilos',
      password: 'mypass',
    },
    {
      id: 2,
      name: 'Camilo',
      lastName: 'Martins',
      email: 'camilo@mail.com',
      username: 'camilos',
      password: 'mypass',
    },
    {
      id: 3,
      name: 'Camilo',
      lastName: 'Martins',
      email: 'camilo@mail.com',
      username: 'camilos',
      password: 'mypass',
    },
    {
      id: 4,
      name: 'Camilo',
      lastName: 'Martins',
      email: 'camilo@mail.com',
      username: 'camilos',
      password: 'mypass',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
