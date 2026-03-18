import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { SharingData } from '../../services/sharing-data';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.html',
})
export class UserComponent {
  @Input() users: User[] = [];
  title: string = 'Listado de usuarios.';

  constructor(
    private service: UserService,
    private router: Router,
    private sharingData: SharingData,
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }
  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('consulta findAll');
      this.service.findAll().subscribe((users) => (this.users = users));
    }
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], { state: { user } });
  }
}
