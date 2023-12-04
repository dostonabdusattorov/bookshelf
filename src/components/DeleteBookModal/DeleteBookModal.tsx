import { Alert, Box, CircularProgress, Modal, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDeleteBookMutation } from "../../store";
import styles from "./DeleteBookModal.module.scss";
import { Button } from "../Button";
import { Error } from "../ErrorMessage";
import x from "../../assets/images/x-circle.svg";

interface Props {
  id: number;
  open: boolean;
  handleClose: () => void;
  onDownloadBooks: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  outline: "none",
  p: 4,
};

export const DeleteBookModal: FC<Props> = ({
  id,
  open,
  handleClose,
  onDownloadBooks,
}) => {
  const [deleteBook, { isSuccess, isLoading, error }] = useDeleteBookMutation();

  const [isDeletingBookSuccess, setIsDeletingBookSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsDeletingBookSuccess(true);
      onDownloadBooks();
      handleClose();
    }
  }, [isSuccess]);

  return createPortal(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.signInForm}>
            <div className={styles.head}>
              <h1>Create Book</h1>
              <img src={x} alt="close icon" onClick={handleClose} />
            </div>
            <div className={styles.form}>
              <div className={styles.btns}>
                <Button width="181px" variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  width="181px"
                  disabled={isLoading}
                  onClick={() => deleteBook(id)}
                >
                  {isLoading ? <CircularProgress /> : "Delete"}
                </Button>
              </div>
            </div>
            {error && <Error message={error} />}
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={isDeletingBookSuccess}
        onClose={() => setIsDeletingBookSuccess(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`Book deleted successfully`}
        </Alert>
      </Snackbar>
    </div>,
    document.querySelector("#create-book-modal") as HTMLHtmlElement
  );
};
