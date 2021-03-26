import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {PageableResponse} from '../dto/response/pageable-response';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderBookResponse} from '../dto/response/order-book-response';
import {OrderBookService} from '../service/order-book.service';
import {OrderBookRequest} from '../dto/request/order-book-request';
import {UserResponse} from '../dto/response/user-response';
import {BookResponse} from '../dto/response/book-response';
import {UserService} from '../service/user.service';
import {BookService} from '../service/book.service';

@Component({
  selector: 'app-board-order-book',
  templateUrl: './board-order-book.component.html',
  styleUrls: ['./board-order-book.component.css']
})
export class BoardOrderBookComponent implements OnInit {

  pageableResponse: PageableResponse<OrderBookResponse>;
  orderBookResponses: Array<OrderBookResponse>;
  usersResponses: Array<UserResponse>;
  booksResponses: Array<BookResponse>;
  isEmployee: boolean;
  titleModal: string;
  orderBookRequest: OrderBookRequest;
  userResponse: UserResponse;
  bookResponse: BookResponse;
  username = '';
  bookname = '';
  enumKeys: Array<string>;
  id = 0;
  size = 5;
  pageNumber = 0;

  constructor(private orderBookService: OrderBookService,
              private userService: UserService,
              private bookService: BookService,
              private appComponent: AppComponent,
              private modalService: NgbModal) {
    this.orderBookRequest = new OrderBookRequest();
    this.userResponse = new UserResponse();
    this.bookResponse = new BookResponse();
  }

  ngOnInit(): void {
    this.appComponent.isEmployeeBehaviorSubject.subscribe(employee => {
      this.isEmployee = employee;
    });
    this.getAllOrderBooksWithPageable();
    this.getAllUser();
    this.getAllBook();
    this.getAllStatus();
  }

  getAllStatus(): void {
    this.orderBookService.getAllStatus().subscribe(value => this.enumKeys = value);
  }

  getAllOrderBooksWithPageable(): void {
    this.orderBookService.getOrderBooks(this.pageNumber, this.size).subscribe(
      data => {
        this.pageableResponse = data;
        this.orderBookResponses = data.content;
        this.pageNumber = data.number;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllUser(): void {
    this.userService.getAllUser(0, 1000000)
      .subscribe(data => this.usersResponses = data.content);
  }

  getAllBook(): void {
    this.bookService.getAllBooksWithPageable(0, 1000000)
      .subscribe(data => this.booksResponses = data.content);
  }

  getOrderBookByReader(id: number): void {
    this.orderBookService.getOrderBookByReader(id, this.pageNumber, this.size).subscribe(
      data => {
        this.pageableResponse = data;
        this.orderBookResponses = data.content;
        this.pageNumber = data.number;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveOrderBook(): void {
    this.orderBookService
      .addOrderBook(this.orderBookRequest)
      .subscribe(() => this.getAllOrderBooksWithPageable());
  }

  updateOrderBook(): void {
    this.orderBookService
      .updateReaderById(this.id, this.orderBookRequest)
      .subscribe(() => this.getAllOrderBooksWithPageable());
  }

  deleteOrderBookById(id: number): void {
    this.orderBookService
      .deleteOrderBookById(id)
      .subscribe(() => this.getAllOrderBooksWithPageable());
  }

  previousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getAllOrderBooksWithPageable();
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.pageableResponse.totalPages - 1) {
      this.pageNumber++;
      this.getAllOrderBooksWithPageable();
    }
  }

  fillFieldsModal(orderBook: OrderBookResponse): void {
    this.id = orderBook.id;
    this.orderBookRequest.status = orderBook.status;
    this.orderBookRequest.user = orderBook.user;
    this.orderBookRequest.book = orderBook.book;
    this.orderBookRequest.note = orderBook.note;
    this.orderBookRequest.startDate = orderBook.startDate;
    this.orderBookRequest.endDate = orderBook.endDate;
  }

  clearData(): void {
    this.id = 0;
    this.orderBookRequest.status = null;
    this.orderBookRequest.user = null;
    this.orderBookRequest.book = null;
    this.orderBookRequest.note = null;
    this.orderBookRequest.startDate = null;
    this.orderBookRequest.endDate = null;
    this.bookname = '';
    this.username = '';
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      for (const userResponses of this.usersResponses) {
        if (userResponses.username === this.username) {
          this.userResponse = userResponses;
        }
      }
      for (const bookResponse of this.booksResponses) {
        if (bookResponse.name === this.bookname) {
          this.bookResponse = bookResponse;
        }
      }
      this.orderBookRequest.user = this.userResponse;
      this.orderBookRequest.book = this.bookResponse;
      const str = result.toString();
      if (str === 'Edit Order Book') {
        this.updateOrderBook();
      } else if (str === 'Add Order Book') {
        this.saveOrderBook();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
