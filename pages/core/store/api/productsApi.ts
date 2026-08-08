import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductApiResponse, Product } from "../../types/product";
import { mapProductFromApi } from "../../types/product";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6a72d3694d741b02b1f7cbff.mockapi.io/products",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => "",
            transformResponse: (response: ProductApiResponse[]) =>
                response.map(mapProductFromApi),
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: ProductApiResponse) =>
                mapProductFromApi(response),
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;