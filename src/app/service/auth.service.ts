import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../helper/app.constants';
import {UserRequest} from "../dto/request/user-request";
import {UserResponse} from "../dto/response/user-response";
import {SignInRequest} from "../dto/request/sign-in-request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(signInRequest: SignInRequest): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', signInRequest, httpOptions);
  }

  register(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(AppConstants.AUTH_API + 'signup', userRequest, httpOptions);
  }
}
