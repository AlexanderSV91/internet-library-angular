import {Component, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {BookResponse} from "../dto/response/book-response";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  booksResponse: Array<BookResponse>;
  isEmployee: boolean;

  constructor(private bookService: BookService, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.appComponent.isEmployeeBehaviorSubject.subscribe(employee => {
      this.isEmployee = employee;
      console.log(employee);
    });
    this.bookService.getAllBooksWithPageable().subscribe(
      data => {
        this.booksResponse = data.content;
      },
      err => {
      }
    );
  }
}
