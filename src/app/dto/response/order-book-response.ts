import {UserResponse} from './user-response';
import {BookResponse} from './book-response';
import {LocalDateTime} from 'js-joda';

export class OrderBookResponse {
  id: number;
  status: string;
  user: UserResponse;
  book: BookResponse;
  note: string;
  startDate: LocalDateTime;
  endDate: LocalDateTime;
}
