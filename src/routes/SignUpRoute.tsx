import { redirect, useNavigate } from "react-router-dom";
import { SignUp, SignUpControllers } from "../components";
import { useSignUpMutation } from "../store";
import { useEffect } from "react";

export const signUpLoader = async () => {
  if (localStorage.getItem("key") && !localStorage.getItem("name")) {
    return null;
  }
  if (localStorage.getItem("key")) {
    return redirect("/");
  }

  return null;
};

export const SignUpRoute = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, isSuccess, data, error }] = useSignUpMutation();

  const signUpHandler = (data: SignUpControllers) => {
    signup(data);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("key", data.data.key);
      localStorage.setItem("secret", data.data.secret);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("name", data.data.name);

      navigate("/", { replace: true });
    }
  }, [isSuccess]);
  return <SignUp loading={isLoading} error={error} onSignUp={signUpHandler} />;
};
