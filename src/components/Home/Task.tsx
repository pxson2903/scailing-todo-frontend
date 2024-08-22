import {
  ITask,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useLazyGetTasksQuery,
  useLazyGetWeatherQuery,
  useUpdateTaskMutation,
} from '@/api/services';
import withPageRequiredAuth from '@/hoc/with-page-required-auth';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const Task = () => {
  const router = useRouter();
  const {
    location,
  } = useCurrentLocation();

  const [fetchTasks, { data: tasks }] = useLazyGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    fetchTasks({}).then().catch();
  }, []);

  const handleCreateTask = async (task: ITask) => {
    await addTask({
      title: task.title,
      description: task.description,
      lat: location?.lat || 0,
      lon: location?.lon || 0,
      apiType: 'weatherstack',
    });

    await fetchTasks({});
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask({
      id: taskId,
    });

    await fetchTasks({});
  };

  const handleUpdateTask = async (taskId: number, completed: boolean) => {
    await updateTask({
      id: taskId,
      completed,
      lat: location?.lat || 0,
      lon: location?.lon || 0,
      apiType: 'weatherstack',
    });

    await fetchTasks({});
  };

  const handleGoToDetailTask = async (taskId: number) => {
    router.push(`/tasks/${taskId}`);
  };

  const completedTasks = useMemo(() => {
    return tasks ? tasks.filter((task) => task.completed).length : 0;
  }, [tasks]);

  const totalTasks = useMemo(() => {
    return tasks ? tasks.length : 0;
  }, [tasks]);

  return (
    <div className="space-y-3">
      <div className="font-semibold text-4xl pb-4">Todo 🧑‍🍳</div>
      <div className="text-base font-semibold">What are you doing today?</div>
      <TextField
        label="What should be done?"
        className="w-full"
        value={task?.title}
        onChange={(e) => {
          setTask({
            title: e.target.value,
            description: `Task ${tasks ? tasks.length + 1 : 0}`,
          });
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleCreateTask(task!);
          }
        }}
      />

      <div className="flex justify-between">
        <span>
          Completed: <span className="font-semibold">{completedTasks}</span>
        </span>
        <span>
          Total: <span className="font-semibold">{totalTasks}</span>
        </span>
      </div>

      {tasks?.map((task: ITask) => (
        <div className="flex items-center justify-between" key={task.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed}
                onChange={(e) => {
                  handleUpdateTask(task.id!, !task.completed);
                }}
              />
            }
            label={
              <p className={classNames({ 'line-through': task.completed })}>
                {task.title}
              </p>
            }
          />
          <Stack direction="row" spacing={2}>
            <MdEdit
              className="text-2xl cursor-pointer"
              onClick={() => handleGoToDetailTask(task.id!)}
            />
            <MdDelete
              className="text-red-600 text-2xl cursor-pointer"
              onClick={() => handleDeleteTask(task.id!)}
            />
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default withPageRequiredAuth(Task);
