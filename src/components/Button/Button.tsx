import { ButtonProps, Button as MuiButton, styled } from "@mui/material";

type Props = {
  width?: string;
};

export const Button = styled(MuiButton)<ButtonProps & Props>(
  ({ variant, width }) => {
    const variantObj = variant
      ? { border: "1px solid #6200EE", color: "#6200EE" }
      : { backgroundColor: "#6200EE", color: "#fff" };
    return {
      ...variantObj,
      width,
      height: "40px",
      marginBottom: "16px",
      "&:hover": variantObj,
    };
  }
);
