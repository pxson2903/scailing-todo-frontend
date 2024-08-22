import { Metadata, NextPage } from 'next';
import TaskForm from './TaskForm';

export const metadata: Metadata = {
  title: 'Detail - Task Management',
  description: 'Task Management',
};

const TaskDetailPage: NextPage = () => {
  return (
    <>
      <TaskForm />
    </>
  );
};

export default TaskDetailPage;
