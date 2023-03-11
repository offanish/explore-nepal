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
      providesTags: (data) =>
        data
          ? [
              { type: 'Place', id: 'List' },
              ...data.map((place) => ({ type: 'Place', id: place._id })),
            ]
          : [{ type: 'Place', id: 'List' }],
    }),
    getPlaceById: builder.query({
      query: (id) => ({
        url: `/places/${id}`,
        method: 'GET',
      }),
      providesTags: (data, error, id) => [{ type: 'Place', id }],
    }),
    createPlace: builder.mutation({
      query: (formData) => ({
        url: '/places',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Place', id: 'List' }],
    }),
    editPlace: builder.mutation({
      query: ({ placeId, formData }) => ({
        url: `/places/${placeId}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (data, error, { editId }) => [
        { type: 'Place', id: editId },
      ],
    }),
    deletePlace: builder.mutation({
      query: (id) => ({
        url: `/places/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Place', id: 'List' }],
    }),
    uploadImage: builder.mutation({
      query: (file) => ({
        url: `/upload`,
        method: 'POST',
        body: file,
      }),
    }),
    deleteImage: builder.mutation({
      query: (image) => ({
        url: `/upload/${image}`,
        method: 'DELETE',
      }),
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
  useUploadImageMutation,
  useDeleteImageMutation,
} = apiSlice
