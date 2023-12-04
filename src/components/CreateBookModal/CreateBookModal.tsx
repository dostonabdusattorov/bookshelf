import { Alert, Box, CircularProgress, Modal, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCreateBookMutation } from "../../store";
import styles from "./CreateBookModal.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import classNames from "classnames";
import { Error } from "../ErrorMessage";
import x from "../../assets/images/x-circle.svg";

interface CreateBookControllers {
  isbn: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  onDownloadBooks: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const CreateBookModal: FC<Props> = ({
  open,
  handleClose,
  onDownloadBooks,
}) => {
  const [createBook, { isSuccess, isLoading, error }] = useCreateBookMutation();

  const [isCreatingBookSuccess, setIsCreatingBookSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBookControllers>();

  useEffect(() => {
    if (isSuccess) {
      setIsCreatingBookSuccess(true);
      setValue("isbn", "");
      onDownloadBooks();
      handleClose();
    }
  }, [isSuccess]);

  const submitHandler: SubmitHandler<CreateBookControllers> = (data) => {
    createBook(data);
  };

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
            <form
              className={styles.form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <div
                className={classNames(styles.input, {
                  [styles.invalid]: errors.isbn,
                })}
              >
                <label htmlFor="Isbn">Your Isbn</label>
                <input
                  id="Isbn"
                  type="number"
                  placeholder="Enter isbn..."
                  {...register("isbn", { required: true })}
                />
              </div>
              <div className={styles.btns}>
                <Button width="181px" variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" width="181px" disabled={isLoading}>
                  {isLoading ? <CircularProgress /> : "Create"}
                </Button>
              </div>
            </form>
            {error && <Error message={error} />}
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={isCreatingBookSuccess}
        onClose={() => setIsCreatingBookSuccess(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`Book created successfully`}
        </Alert>
      </Snackbar>
    </div>,
    document.querySelector("#create-book-modal") as HTMLHtmlElement
  );
};
