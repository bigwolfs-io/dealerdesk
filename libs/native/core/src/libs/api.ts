import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateTask, IFindAllTask, ITask, IUpdateTask } from '@dealerdesk/shared/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from './firebase';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.10.5:3000/api',

    prepareHeaders: async (headers,) => {
      const token = await AsyncStorage.getItem(TOKEN_KEY)

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<IFindAllTask, void>({
      query: () => ({
        url: '/tasks',
        method: 'GET',
      }),
      providesTags: ['Tasks']
    }),
    createTask: builder.mutation<ITask, ICreateTask>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTask: builder.mutation<ITask, { id: string, body: IUpdateTask }>({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Tasks']
    }),
    completeTask: builder.mutation<ITask, { id: string }>({
      query: ({ id }) => ({
        url: `/tasks/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks']
    }),
    priortizeTask: builder.mutation<ITask, { id: string; priority: string }>({
      query: ({ id, priority }) => ({
        url: `/tasks/${id}/priortize/${priority}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: builder.mutation<ITask, { id: string }>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  usePriortizeTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
} = api
