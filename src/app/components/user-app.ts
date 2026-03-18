import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';
import { User } from '../models/user';
import { UserComponent } from './user/user';
import { UserForm } from './user-form/user-form';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { SharingData } from '../services/sharing-data';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, Navbar],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserApp implements OnInit {
  title: string;

  users: User[] = [];
  userSelected: User;

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingData,
  ) {
    this.title = 'Hola, usarios';
    this.userSelected = new User();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUser();
    this.editUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find((user) => user.id == id);
      this.sharingData.selectedUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        this.service.updateUser(user).subscribe((userUpdate) => {
          this.users = this.users.map((u) => (u.id == userUpdate.id ? { ...userUpdate } : u));
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      } else {
        this.service.createUser(user).subscribe((newUser) => {
          console.log(user);
          this.users = [...this.users, { ...newUser }];
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      }

      Swal.fire({
        title: 'Guardado',
        text: 'El usuario ha sido guardado exitosamente',
        icon: 'success',
      });
    });
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe((id) => {
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
          this.service.delete(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], { state: { users: this.users } });
            });
          });

          Swal.fire({
            title: 'Eliminado',
            text: 'Usuario eliminado con exito',
            icon: 'success',
          });
        }
      });
    });
  }

  editUser(): void {
    this.sharingData.selectUserEventEmitter.subscribe((user) => {
      this.userSelected = { ...user };
    });
  }
}
