import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './service/token-storage.service';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  isEmployee = false;
  isEmployeeBehaviorSubject: BehaviorSubject<boolean>;
  username: string;
  title = 'internet-library-angular';

  constructor(private tokenStorageService: TokenStorageService) {
    this.isEmployeeBehaviorSubject = new BehaviorSubject<boolean>(this.isEmployee);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isEmployeeBehaviorSubject.next(this.isEmployee = this.roles.includes('ROLE_EMPLOYEE'));
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
