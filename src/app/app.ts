import { Component } from '@angular/core';
import { UserApp } from './components/user-app';

@Component({
  selector: 'app-root',
  imports: [UserApp],
  templateUrl: './app.html',
})
export class App {
  title = 'users-app';
}
