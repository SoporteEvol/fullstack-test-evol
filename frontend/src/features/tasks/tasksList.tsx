import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from './slices/tasksSlice';
import { RootState, AppDispatch } from '../../store';
import TaskForm, { TaskProp } from './taskForm';

const TasksList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loadingTasks, errorFetchTasks } = useSelector((state: RootState) => state.tasks);

  const [selectedTask, setSelectedTask] = useState<TaskProp | undefined | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task: TaskProp | null | undefined) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteTask(id as unknown as string));
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setSelectedTask(null);
          setIsFormOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Task
      </button>
      {isFormOpen && <TaskForm task={selectedTask} onClose={() => setIsFormOpen(false)} />}
      {loadingTasks ? (
        <div>Loading...</div>
      ) : errorFetchTasks ? (
        <div>Error: {errorFetchTasks}</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b p-2">
              <h2 className="text-xl">{task.title}</h2>
              <p>{task.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
