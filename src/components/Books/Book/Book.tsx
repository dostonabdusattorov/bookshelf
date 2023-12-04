import { FC, useState } from "react";
import styles from "./Book.module.scss";
import { BookData } from "../../../models";
import deleteIcon from "../../../assets/images/trash-01.svg";
import editIcon from "../../../assets/images/edit-04.svg";
import classNames from "classnames";
import { EditBookModal } from "../../EditBookModal";
import { DeleteBookModal } from "../../DeleteBookModal";

interface Props {
  onDownloadBooks: () => void;
}

export const Book: FC<BookData & Props> = ({ book, onDownloadBooks }) => {
  const [hover, setHover] = useState(false);

  const [open, setOpen] = useState({ editOpen: false, deleteOpen: false });

  const handleOpen = (editOpen: boolean, deleteOpen: boolean) =>
    setOpen({ editOpen, deleteOpen });
  const handleClose = () => setOpen({ editOpen: false, deleteOpen: false });

  return (
    <div
      className={styles.book}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{book.title}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid
        inventore quaerat aut reiciendis nam nulla, unde cum velit esse?
      </p>
      <div className={styles.footer}>
        <span>
          {book.author}: {book.published} - year
        </span>
        <div className={styles.page}>{book.pages} pages</div>
      </div>
      <div className={classNames(styles.btns, { [styles.none]: !hover })}>
        <span
          onClick={() => {
            handleOpen(false, true);
            setHover(false);
          }}
        >
          <img src={deleteIcon} alt="delete icon" />
        </span>
        <span
          onClick={() => {
            handleOpen(true, false);
            setHover(false);
          }}
        >
          <img src={editIcon} alt="delete icon" />
        </span>
      </div>
      {open.deleteOpen && (
        <DeleteBookModal
          id={book.id}
          open={open.deleteOpen}
          handleClose={handleClose}
          onDownloadBooks={onDownloadBooks}
        />
      )}
      {open.editOpen && (
        <EditBookModal
          id={book.id}
          open={open.editOpen}
          handleClose={handleClose}
          onDownloadBooks={onDownloadBooks}
        />
      )}
    </div>
  );
};
