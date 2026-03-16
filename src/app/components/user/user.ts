import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
})
export class UserComponent {
  @Input() users: User[] = [];

  constructor() {}

  @Output() idUserEventEmitter = new EventEmitter();
  @Output() selectUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.selectUserEventEmitter.emit(user);
  }
}
