import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../helper/app.constants';
import {BookResponse} from '../dto/response/book-response';
import {BookRequest} from '../dto/request/book-request';
import {PageableResponse} from '../dto/response/pageable-response';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAllBooksWithPageable(pageNumber: number, size: number): Observable<PageableResponse<BookResponse>> {
    return this.http.get<PageableResponse<BookResponse>>(AppConstants.API_URL_BOOK + '?page=' + pageNumber + '&size=' + size, httpOptions);
  }

  getBookById(id: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(AppConstants.API_URL_BOOK + '/' + id, httpOptions);
  }

  saveBook(bookRequest: BookRequest): Observable<BookResponse> {
    return this.http.post<BookResponse>(AppConstants.API_URL_BOOK, bookRequest, httpOptions);
  }

  updateBookById(id: number, bookRequest: BookRequest): Observable<BookResponse> {
    return this.http.put<BookResponse>(AppConstants.API_URL_BOOK + '/' + id, bookRequest, httpOptions);
  }

  deleteBookById(id: number): Observable<any> {
    return this.http.delete(AppConstants.API_URL_BOOK + '/' + id);
  }
}
