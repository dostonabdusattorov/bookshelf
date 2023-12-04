import { redirect } from "react-router-dom";
import { useSignInQuery } from "../store";
import { useEffect, useState } from "react";
import { Header } from "../components";
import { Books } from "../components";

export const homeLoader = async () => {
  if (!localStorage.getItem("key") || !localStorage.getItem("secret"))
    return redirect("/sign-up");
  if (!localStorage.getItem("name")) return redirect("/sign-in");

  return null;
};

export const Home = () => {
  const { data: user } = useSignInQuery("");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    localStorage.setItem("name", user?.data?.name);
  }, [user]);

  return (
    <>
      <Header
        search={searchText}
        onSearch={(text: string) => {
          setSearchText(text);
        }}
      />
      <Books search={searchText} />
    </>
  );
};
