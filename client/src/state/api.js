import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Product'],
  endpoints: (build) => ({
    // useGetUserQuery
    getUser: build.query({
      query: (id) => `general/user/${id}`, // Path
      providesTags: ['User'], // Tag
    }),
    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery } = api;
