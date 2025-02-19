import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../redux/tasksSlice';
import { RootState, AppDispatch } from '../redux/store';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.map(task => (
        <div key={task.id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Fecha:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Sin fecha"}</p>
          <p><strong>Etiquetas:</strong> {task.tags?.length ? task.tags.join(', ') : 'Ninguna'}</p>
          <button onClick={() => dispatch(updateTask({ id: task.id, task: { completed: !task.completed } }))}>
            {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completado'}
          </button>
          <button onClick={() => dispatch(deleteTask(task.id))}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
