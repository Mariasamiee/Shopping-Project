import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductApiResponse, Product } from "../../types/product";
import { mapProductFromApi } from "../../types/product";

export interface GetProductsParams {
    category?: string;
    search?: string;
    sortBy?: "price" | "createdAt" | "soldCount";
    order?: "asc" | "desc";
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://6a72d3694d741b02b1f7cbff.mockapi.io/products"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], GetProductsParams | void>({
            query: (params) => ({
                url: "",
                params: params || {},
            }),
            transformResponse: (response: ProductApiResponse[]) =>
                response.map(mapProductFromApi)
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => `/${id}`,
            transformResponse: (response: ProductApiResponse) => mapProductFromApi(response)
        }),

        getRelatedProducts: builder.query<Product[], { category: string; excludeId: string }>({
            query: ({ category }) => ({
                url: "",
                params: { category }
            }),
            transformResponse: (response: ProductApiResponse[], _meta, arg) => response.filter((item) => item.id !== arg.excludeId).slice(0, 5).map(mapProductFromApi)
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useGetRelatedProductsQuery } = productsApi;