import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {BookResponse} from '../dto/response/book-response';
import {AppComponent} from '../app.component';
import {PageableResponse} from '../dto/response/pageable-response';
import {BookRequest} from '../dto/request/book-request';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board-book',
  templateUrl: './board-book.component.html',
  styleUrls: ['./board-book.component.css']
})
export class BoardBookComponent implements OnInit {

  pageableResponse: PageableResponse<BookResponse>;
  booksResponse: Array<BookResponse>;
  isEmployee: boolean;
  titleModal: string;
  book: BookRequest;
  id = 0;
  size = 5;
  pageNumber = 0;

  constructor(private bookService: BookService,
              private appComponent: AppComponent,
              private modalService: NgbModal) {
    this.book = new BookRequest();
  }

  ngOnInit(): void {
    this.appComponent.isEmployeeBehaviorSubject.subscribe(employee => {
      this.isEmployee = employee;
    });

    this.getAllBooksWithPageable();
  }

  getAllBooksWithPageable(): void {
    this.bookService.getAllBooksWithPageable(this.pageNumber, this.size).subscribe(
      data => {
        this.pageableResponse = data;
        this.booksResponse = data.content;
        this.pageNumber = data.number;
      },
      err => {
        console.log(err);
      }
    );
  }

  saveBook(): void {
    this.bookService
      .saveBook(this.book)
      .subscribe(() => this.getAllBooksWithPageable());
  }

  updateBook(): void {
    this.bookService
      .updateBookById(this.id, this.book)
      .subscribe(() => this.getAllBooksWithPageable());
  }

  deleteBookById(id: number): void {
    this.bookService
      .deleteBookById(id)
      .subscribe(() => this.getAllBooksWithPageable());
  }

  previousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getAllBooksWithPageable();
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.pageableResponse.totalPages - 1) {
      this.pageNumber++;
      this.getAllBooksWithPageable();
    }
  }

  fillFieldsModal(book: BookResponse): void {
    this.id = book.id;
    this.book.name = book.name;
    this.book.description = book.description;
    this.book.bookCondition = book.bookCondition;
  }

  clearData(): void {
    this.id = 0;
    this.book.name = null;
    this.book.description = null;
    this.book.bookCondition = null;
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const str = result.toString();
      if (str === 'Edit Book') {
        this.updateBook();
      } else if (str === 'Add Book') {
        this.saveBook();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
