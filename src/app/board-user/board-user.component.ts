import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {UserResponse} from "../dto/response/user-response";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  isEmployee: boolean;
  usersResponse: Array<UserResponse>;

  constructor(private userService: UserService, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.appComponent.isEmployeeBehaviorSubject.subscribe(employee => {
      this.isEmployee = employee;
      console.log(employee);
    });
    this.userService.getAllUserByUsername().subscribe(
      data => {
        this.usersResponse = data.content;
      },
      err => {
      }
    );
  }
}
