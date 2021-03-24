import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {OrderBookResponse} from "../dto/response/order-book-response";
import {AppConstants} from "../helper/app.constants";
import {OrderBookRequest} from "../dto/request/order-book-request";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderBookService {

  constructor(private http: HttpClient) {
  }

  getOrderBooksByUserUserName(): Observable<OrderBookResponse> {
    return this.http.get<OrderBookResponse>(AppConstants.API_URL_ORDER_BOOK, httpOptions);
  }

  getAllOrderBookById(id: number): Observable<OrderBookResponse> {
    return this.http.get<OrderBookResponse>(AppConstants.API_URL_ORDER_BOOK + id, httpOptions);
  }

  getOrderBookByReader(idReader: number): Observable<OrderBookResponse> {
    return this.http.get<OrderBookResponse>(AppConstants.API_URL_ORDER_BOOK + idReader, httpOptions);
  }

  addOrderBook(orderBookRequest: OrderBookRequest): Observable<OrderBookResponse> {
    return this.http.post<OrderBookResponse>(AppConstants.API_URL_ORDER_BOOK, orderBookRequest, httpOptions);
  }

  updateReaderById(id: number, orderBookRequest: OrderBookRequest): Observable<OrderBookResponse> {
    return this.http.put<OrderBookResponse>(AppConstants.API_URL_ORDER_BOOK + id, orderBookRequest, httpOptions);
  }

  deleteOrderBookById(id: number): Observable<any> {
    return this.http.delete(AppConstants.API_URL_ORDER_BOOK + id);
  }
}
