import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTasksQuery,
} from '@dealerdesk/native/core';
import { ICreateTask, ITask, IUpdateTask, TaskPriority } from '@dealerdesk/shared/types';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useTask(task?: ITask) {
  const defaultValues = useMemo(() => {
    return {
      ...task,
      dueDate: task?.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : '',
      priority: task?.priority ? task.priority : TaskPriority.MEDIUM,
    };
  }, [task]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ICreateTask | IUpdateTask>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const [
    createTask,
    {
      isLoading: isCreatingTask,
      error: createTaskError,
      isError: isCreateTaskError,
    },
  ] = useCreateTaskMutation();
  const [
    deleteTaskMutation,
    {
      isLoading: isDeletingTask,
      error: deleteTaskError,
      isError: isDeleteTaskError,
    },
  ] = useDeleteTaskMutation();

  const [
    updateTaskMutation,
    {
      isLoading: isUpdatingTask,
      error: updateTaskError,
      isError: isUpdateTaskError,
    },
  ] = useUpdateTaskMutation();

  const {
    data: tasks,
    isLoading: isGettingTasks,
    error: getTasksError,
  } = useGetTasksQuery();

  return {
    operations: {
      updateTaskMutation,
      deleteTaskMutation,
      createTaskMutation: createTask,
      setValue,
      handleSubmit,
    },
    models: {
      tasks,
      isGettingTasks,
      getTasksError,
      isUpdatingTask,
      updateTaskError,
      isUpdateTaskError,
      deleteTaskError,
      isDeletingTask,
      isDeleteTaskError,
      isCreatingTask,
      isCreateTaskError,
      createTaskError,
      control,
      watch,
      errors,
    },
  };
}
