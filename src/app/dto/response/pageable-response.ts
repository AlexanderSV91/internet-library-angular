export class PageableResponse<T> {
  content: Array<T>;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
}
