import { Component, EventEmitter, Input } from '@angular/core';
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
    if (this.router.getCurrentNavigation()?.extras.state!) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe((getUsers) => (this.users = getUsers));
    }
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], { state: { user } });
  }
}
