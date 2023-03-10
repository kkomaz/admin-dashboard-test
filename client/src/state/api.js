import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Product', 'Customers', 'Transactions'],
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
    getCustomers: build.query({
      query: () => 'client/customers',
      providerTags: ['Customer'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = api;
