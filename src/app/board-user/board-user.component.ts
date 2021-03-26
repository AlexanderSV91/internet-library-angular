import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {UserResponse} from '../dto/response/user-response';
import {AppComponent} from '../app.component';
import {PageableResponse} from '../dto/response/pageable-response';
import {UserRequest} from '../dto/request/user-request';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  pageableResponse: PageableResponse<UserResponse>;
  usersResponse: Array<UserResponse>;
  isEmployee: boolean;
  titleModal: string;
  user: UserRequest;
  id = 0;
  size = 5;
  pageNumber = 0;

  constructor(private userService: UserService,
              private appComponent: AppComponent,
              private modalService: NgbModal) {
    this.user = new UserRequest();
  }

  ngOnInit(): void {
    this.appComponent.isEmployeeBehaviorSubject.subscribe(employee => {
      this.isEmployee = employee;
    });

    this.getAllUsersWithPageable();
  }

  getAllUsersWithPageable(): void {
    this.userService.getAllUser(this.pageNumber, this.size).subscribe(
      data => {
        this.pageableResponse = data;
        this.usersResponse = data.content;
        this.pageNumber = data.number;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveUser(): void {
    this.userService
      .addUser(this.user)
      .subscribe(() => this.getAllUsersWithPageable());
  }

  updateUser(): void {
    this.userService
      .updateUserById(this.id, this.user)
      .subscribe(() => this.getAllUsersWithPageable());
  }

  deleteUserById(id: number): void {
    this.userService
      .deleteUserById(id)
      .subscribe(() => this.getAllUsersWithPageable());
  }

  previousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getAllUsersWithPageable();
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.pageableResponse.totalPages - 1) {
      this.pageNumber++;
      this.getAllUsersWithPageable();
    }
  }

  fillFieldsModal(user: UserResponse): void {
    this.id = user.id;
    this.user.username = user.username;
    this.user.email = user.email;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.age = user.age;
  }

  clearData(): void {
    this.id = 0;
    this.user.username = null;
    this.user.password = null;
    this.user.email = null;
    this.user.firstName = null;
    this.user.lastName = null;
    this.user.age = null;
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const str = result.toString();
      if (str === 'Edit User') {
        this.updateUser();
      } else if (str === 'Add User') {
        this.saveUser();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
