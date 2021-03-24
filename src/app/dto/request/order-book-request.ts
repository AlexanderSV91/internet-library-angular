import {OrderBookStatus} from '../order-book-status.enum';
import {UserResponse} from '../response/user-response';
import {BookResponse} from '../response/book-response';
import {LocalDateTime} from 'js-joda';

export class OrderBookRequest {
  status: OrderBookStatus;
  user: UserResponse;
  book: BookResponse;
  note: string;
  startDate: LocalDateTime;
  endDate: LocalDateTime;
}
