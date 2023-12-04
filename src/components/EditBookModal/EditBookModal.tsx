import { Alert, Box, CircularProgress, Modal, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditBookMutation } from "../../store";
import styles from "./EditBookModal.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import classNames from "classnames";
import { Error } from "../ErrorMessage";
import x from "../../assets/images/x-circle.svg";
import { BookStatusEnum } from "../../models";

interface EditBookControllers {
  status: BookStatusEnum;
}

interface Props {
  id: number;
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
  outline: "none",
  p: 4,
};

export const EditBookModal: FC<Props> = ({
  id,
  open,
  handleClose,
  onDownloadBooks,
}) => {
  const [editBook, { isSuccess, isLoading, error }] = useEditBookMutation();

  const [isEditingBookSuccess, setIsEditingBookSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBookControllers>();

  useEffect(() => {
    if (isSuccess) {
      setIsEditingBookSuccess(true);
      onDownloadBooks();
      handleClose();
    }
  }, [isSuccess]);

  const submitHandler: SubmitHandler<EditBookControllers> = (data) => {
    console.log({ id, body: data });
    editBook({ id, body: data });
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
              <h1>Edit Book</h1>
              <img src={x} alt="close icon" onClick={handleClose} />
            </div>
            <form
              className={styles.form}
              onSubmit={handleSubmit(submitHandler)}
            >
              <div
                className={classNames(styles.input, {
                  [styles.invalid]: errors.status,
                })}
              >
                <label htmlFor="Status">Your Status</label>
                <select id="Status" {...register("status", { required: true })}>
                  <option value={BookStatusEnum.New}>New</option>
                  <option value={BookStatusEnum.Reading}>Reading</option>
                  <option value={BookStatusEnum.Finished}>Finished</option>
                </select>
              </div>
              <div className={styles.btns}>
                <Button width="181px" variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" width="181px" disabled={isLoading}>
                  {isLoading ? <CircularProgress /> : "Edit"}
                </Button>
              </div>
            </form>
            {error && <Error message={error} />}
          </div>
        </Box>
      </Modal>
      <Snackbar
        open={isEditingBookSuccess}
        onClose={() => setIsEditingBookSuccess(false)}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`Book edited successfully`}
        </Alert>
      </Snackbar>
    </div>,
    document.querySelector("#create-book-modal") as HTMLHtmlElement
  );
};
