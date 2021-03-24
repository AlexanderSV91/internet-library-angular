import {UserResponse} from "./user-response";
import {BookResponse} from "./book-response";
import {OrderBookStatus} from "../order-book-status.enum";
import {LocalDateTime} from "js-joda";

export class OrderBookResponse {
  id: number;
  status: OrderBookStatus;
  user: UserResponse;
  book: BookResponse;
  note: string;
  startDate: LocalDateTime;
  endDate: LocalDateTime;
}
