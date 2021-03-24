import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {UserRequest} from "../dto/request/user-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userRequest: UserRequest;

  constructor(private authService: AuthService) {
    this.userRequest = new UserRequest();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.userRequest).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
