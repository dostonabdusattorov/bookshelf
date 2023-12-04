import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";
import { md5Hash } from "../../utils";
import { BookResponse } from "../../models";

export const bookshelfApi = createApi({
  reducerPath: "bookshelfApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const key = localStorage.getItem("key");

      if (key) {
        headers.set("Key", key);
      }

      return headers;
    },
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getAllBooks: builder.mutation<BookResponse, string>({
      query: () => {
        const Hash = md5Hash(
          "GET",
          "/books",
          "",
          localStorage.getItem("secret")
        );

        return {
          url: "/books",
          headers: {
            Sign: Hash,
          },
        };
      },
      invalidatesTags: ["books"],
    }),
    getSearchBooks: builder.query({
      query: (search) => {
        const Hash = md5Hash(
          "GET",
          `/books/${search}`,
          "",
          localStorage.getItem("secret")
        );

        return {
          url: `/books/${search}`,
          headers: {
            Sign: Hash,
          },
        };
      },
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (body) => {
        const Hash = md5Hash(
          "POST",
          "/books",
          JSON.stringify(body),
          localStorage.getItem("secret")
        );
        return {
          url: "/books",
          method: "POST",
          headers: {
            Sign: Hash,
          },
          body,
        };
      },
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id: number | undefined) => {
        const url = `/books/${id}`;
        const Hash = md5Hash("DELETE", url, "", localStorage.getItem("secret"));
        return {
          url,
          method: "DELETE",
          headers: {
            Sign: Hash,
          },
        };
      },
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: (payload) => {
        const url = `/books/${payload.id}`;
        const Hash = md5Hash(
          "PATCH",
          url,
          JSON.stringify(payload.body),
          localStorage.getItem("secret")
        );
        return {
          url,
          method: "PATCH",
          headers: {
            Sign: Hash,
          },
          body: payload.body,
        };
      },
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBooksMutation,
  useGetSearchBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = bookshelfApi;
