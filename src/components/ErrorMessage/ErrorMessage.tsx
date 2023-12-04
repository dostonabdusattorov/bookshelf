import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FC, forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  message: any;
}

export const Error: FC<Props> = ({ message }) => {
  // @ts-ignore
  return <Alert severity="error">{message.data.message}</Alert>;
};
