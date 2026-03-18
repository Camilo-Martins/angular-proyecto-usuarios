import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingData } from '../../services/sharing-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  user!: User;

  constructor(
    private sharingData: SharingData,
    private route: ActivatedRoute,
    private service: UserService,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.selectedUserEventEmitter.subscribe((user) => (this.user = user));

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
        /*  this.service.findByID(id).subscribe((user) => {
          this.user = user;
          
        }); */
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }
}
