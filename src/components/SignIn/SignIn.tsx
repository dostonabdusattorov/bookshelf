// import { useGoogleLogin } from "@react-oauth/google";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignIn.module.scss";
import classNames from "classnames";
import { FC } from "react";
import { Button } from "../Button";
import { Error } from "../ErrorMessage";

export type SignInControllers = {
  email: string;
  key: string;
};

interface Props {
  error: boolean;
  onSignIn: (data: SignInControllers) => void;
}

export const SignIn: FC<Props> = ({ error, onSignIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInControllers>();

  const submitHandler: SubmitHandler<SignInControllers> = (data) => {
    onSignIn(data);
  };
  return (
    <section className={styles.signIn}>
      <div className={styles.signInForm}>
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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
          <Button type="submit" width="100%">
            Submit
          </Button>
        </form>
        {error && (
          <Error
            message={{
              data: { message: "Wrong! Do you really have account!" },
            }}
          />
        )}
      </div>
    </section>
  );
};
