import { axiosBaseQuery } from '@/api/interceptor/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
export interface ITask {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
  createdBy?: number;
  temperature?: number;
  weatherDescription?: string;
  city?: string;
  country?: string;
  humidity?: number;
  windSpeed?: number;
}

export interface IGetTasksRequest {}

export interface IGetTaskDetail {
  id: number;
}

export type ApiType = 'openweathermap' | 'weatherstack';

export interface IAddTaskRequest {
  title?: string;
  description?: string;
  compelted?: boolean;
  lat?: number;
  lon?: number;
  apiType?: ApiType;
}

export interface IUpdateTaskRequest {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  lat?: number;
  lon?: number;
  apiType?: ApiType;
}

export interface IDeleteTaskRequest {
  id: number;
}

export const taskApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], IGetTasksRequest>({
      query: (data) => ({
        url: `/tasks`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Task', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    getTaskDetail: builder.query<ITask, IGetTaskDetail>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'GET',
      }),
    }),
    addTask: builder.mutation<ITask, IAddTaskRequest>({
      query: (data) => ({
        url: `/tasks`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<ITask, IUpdateTaskRequest>({
      query: ({ id, ...data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        data: data,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<ITask, IDeleteTaskRequest>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
  reducerPath: 'tasks',
  tagTypes: ['Task'],
});

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useLazyGetTaskDetailQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
