import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../helper/app.constants';
import {UserRequest} from '../dto/request/user-request';
import {UserResponse} from '../dto/response/user-response';
import {PageableResponse} from '../dto/response/pageable-response';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUser(pageNumber: number, size: number): Observable<PageableResponse<UserResponse>> {
    return this.http.get<PageableResponse<UserResponse>>(AppConstants.API_URL_USER + '?page=' + pageNumber + '&size=' + size, httpOptions);
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(AppConstants.API_URL_USER + '/current-user', httpOptions);
  }

  getMe(): Observable<any> {
    return this.http.get(AppConstants.API_URL_USER + '/me', httpOptions);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(AppConstants.API_URL_USER + '/' + id, httpOptions);
  }

  addUser(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(AppConstants.API_URL_USER, userRequest, httpOptions);
  }

  updateUserById(id: number, userRequest: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(AppConstants.API_URL_USER + '/' + id, userRequest, httpOptions);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete(AppConstants.API_URL_USER + '/' + id);
  }
}
