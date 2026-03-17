import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingData } from '../../services/sharing-data';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
})
export class UserForm {
  user!: User;

  constructor(
    private sharingData: SharingData,
    private router: Router,
  ) {
    if (this.router.getCurrentNavigation()?.extras.state!) {
      console.log(this.user);
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new User();
    }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }
}
