import { redirect, useNavigate } from "react-router-dom";
import { SignIn, SignInControllers } from "../components";
import { useState } from "react";

export const signInLoader = async () => {
  if (localStorage.getItem("name")) {
    return redirect("/");
  }

  return null;
};

export const SignInRoute = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const signInHandler = (data: SignInControllers) => {
    if (
      data.email === localStorage.getItem("email") &&
      data.key === localStorage.getItem("key")
    ) {
      localStorage.setItem("name", "lorem");
      navigate("/");
    } else {
      setError(true);
    }
  };
  return <SignIn error={error} onSignIn={signInHandler} />;
};
