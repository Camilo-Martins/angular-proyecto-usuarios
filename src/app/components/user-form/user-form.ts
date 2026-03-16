import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
})
export class UserForm {
  @Input() user!: User;

  @Input() open: boolean = false;

  constructor() {
    this.user = new User();
  }

  @Output() openEventEmmit = new EventEmitter();
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onOpen(): void {
    this.openEventEmmit.emit();
  }
}
