import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';
import { User } from '../models/user';
import { UserComponent } from './user/user';
import { UserForm } from './user-form/user-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserForm],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserApp implements OnInit {
  title: string;

  users: User[] = [];
  userSelected: User;
  open: boolean = false;

  constructor(private service: UserService) {
    this.title = 'Hola, usarios';
    this.userSelected = new User();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map((u) => {
        if (u.id == user.id) {
          return { ...user };
        }

        return u;
      });
    } else {
      this.users = [...this.users, { ...user }];
    }

    Swal.fire({
      title: 'Guardado',
      text: 'El usuario ha sido guardado exitosamente',
      icon: 'success',
    });

    this.userSelected = new User();
    this.setOpen();
  }

  removeUser(id: number): void {
    Swal.fire({
      title: 'Seguro que deseas eliminar?',
      text: 'No podrás revertir la acción realizada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((user) => user.id != id);
        Swal.fire({
          title: 'Eliminado',
          text: 'Usuario eliminado con exito',
          icon: 'success',
        });
      }
    });
  }

  editUser(user: User): void {
    this.userSelected = { ...user };
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }
}
