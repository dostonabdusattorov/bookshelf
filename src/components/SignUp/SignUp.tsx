// import { useGoogleLogin } from "@react-oauth/google";
import { useForm, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import styles from "./SignUp.module.scss";
import classNames from "classnames";
import { FC } from "react";
import { Button } from "../Button";
import { Error } from "../ErrorMessage";

export type SignUpControllers = {
  name: string;
  email: string;
  key: string;
  secret: string;
};

interface Props {
  loading: boolean;
  error: any;
  onSignUp: (data: SignUpControllers) => void;
}

export const SignUp: FC<Props> = ({ loading, error, onSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpControllers>();

  const submitHandler: SubmitHandler<SignUpControllers> = (data) => {
    onSignUp(data);
  };

  return (
    <section className={styles.signUp}>
      <div className={styles.signUpForm}>
        <h1>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div
            className={classNames(styles.input, {
              [styles.invalid]: errors.name,
            })}
          >
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
          </div>
          <div
            className={classNames(styles.input, {
              [styles.invalid]: errors.email,
            })}
          >
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div
            className={classNames(styles.input, {
              [styles.invalid]: errors.key,
            })}
          >
            <label htmlFor="key">Your password</label>
            <input
              id="key"
              type="password"
              placeholder="Enter your key"
              autoComplete="on"
              {...register("key", { required: true })}
            />
          </div>
          <div
            className={classNames(styles.input, {
              [styles.invalid]: errors.secret,
            })}
          >
            <label htmlFor="secret">Your secret</label>
            <input
              id="secret"
              type="password"
              placeholder="Enter your secret"
              autoComplete="on"
              {...register("secret", { required: true })}
            />
          </div>

          <Button type="submit" width="100%">
            {loading ? <CircularProgress color="primary" /> : "Submit"}
          </Button>
        </form>
        {error && <Error message={error} />}
      </div>
    </section>
  );
};
