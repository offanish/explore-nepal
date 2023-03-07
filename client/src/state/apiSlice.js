import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    },
  }),
  tagTypes: ['User', 'Place'],
  endpoints: (builder) => ({
    //place endpoints
    getAllPlaces: builder.query({
      query: () => ({ url: '/places', method: 'GET' }),
      providesTags: ['Place'],
    }),
    getPlaceById: builder.query({
      query: (id) => ({
        url: `/places/${id}`,
        method: 'GET',
      }),
      providesTags: ['Place'],
    }),
    createPlace: builder.mutation({
      query: (place) => ({
        url: '/places',
        method: 'POST',
        body: place,
      }),
      invalidatesTags: ['Place'],
    }),
    editPlace: builder.mutation({
      query: ({ editId, values }) => ({
        url: `/places/${editId}`,
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: ['Place'],
    }),
    deletePlace: builder.mutation({
      query: (id) => ({
        url: `/places/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Place'],
    }),
    //user endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetAllPlacesQuery,
  useGetPlaceByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreatePlaceMutation,
  useEditPlaceMutation,
  useDeletePlaceMutation,
} = apiSlice
