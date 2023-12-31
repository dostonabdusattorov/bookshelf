import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";
import { md5Hash } from "../../utils";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const key = localStorage.getItem("key");

      if (key) {
        headers.set("Key", key);
      }

      return headers;
    },
  }),
  tagTypes: ["register"],
  endpoints: (builder) => ({
    signIn: builder.query({
      query: () => {
        const Hash = md5Hash(
          "GET",
          "/myself",
          "",
          localStorage.getItem("secret")
        );

        return {
          url: "/myself",
          headers: {
            Sign: Hash,
          },
        };
      },
    }),
    signUp: builder.mutation({
      query: (body) => {
        return {
          url: "/signup",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useSignInQuery, useSignUpMutation } = registerApi;
