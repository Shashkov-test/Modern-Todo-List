import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTasks = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...name }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: name,
      }),
      invalidatesTags: ["Tasks"],
    }),
    filterTask: builder.mutation({
      query: ({ id, ...props }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: props,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useFilterTaskMutation,
} = apiTasks;
