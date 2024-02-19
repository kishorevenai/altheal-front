import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/party/login",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
         url: "/party/create",
         method:"POST",
         body:{
          ...credentials
         }
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/party/refresh",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token } = data;

          dispatch(setCredentials({ token }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation,useSignInMutation } = authApiSlice;
