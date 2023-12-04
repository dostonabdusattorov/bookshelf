import { BookData } from ".";

export interface BookResponse {
  data: BookData[];
  isOk: boolean;
  message: "string";
}
