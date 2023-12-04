import { FC, useEffect, useState } from "react";
import styles from "./Books.module.scss";
import { useGetAllBooksMutation } from "../../store";
import { Button } from "../Button";
import { CreateBookModal } from "../CreateBookModal";
import { BookData } from "../../models";
import { CircularProgress } from "@mui/material";
import { Book } from "./Book";

interface Props {
  search: string;
}

export const Books: FC<Props> = ({ search }) => {
  const [getBooks, { data: books, isSuccess, isLoading }] =
    useGetAllBooksMutation();

  const [searchedBooks, setSearchedBooks] = useState<BookData[] | null>(null);

  const downLoadBooks = () => getBooks("");

  useEffect(() => {
    downLoadBooks();
  }, []);

  useEffect(() => {
    if (books?.data) {
      setSearchedBooks(
        books.data.filter(({ book }: BookData) =>
          book.title?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    if (isSuccess) {
      setSearchedBooks(books ? books.data : null);
    }
  }, [isSuccess]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main className={styles.main}>
      <div className={styles.titleCreateBook}>
        <div className={styles.title}>
          <h1>
            You've got{" "}
            <span>{books && books?.data ? books?.data?.length : 0} books</span>
          </h1>
          <p>Your books today</p>
        </div>
        <div className={styles.createBook}>
          <input type="text" placeholder="Enter your name" />
          <Button onClick={handleOpen}>
            <span>+</span> Create a Book
          </Button>
          <CreateBookModal
            open={open}
            handleClose={handleClose}
            onDownloadBooks={downLoadBooks}
          />
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress size={100} />
        </div>
      ) : (
        <div className={styles.books}>
          {searchedBooks?.map(({ book, status }: BookData) => (
            <Book
              book={book}
              status={status}
              key={book.id}
              onDownloadBooks={downLoadBooks}
            />
          ))}
        </div>
      )}
    </main>
  );
};
