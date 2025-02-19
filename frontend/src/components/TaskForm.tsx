import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/tasksSlice';
import { AppDispatch } from '../redux/store';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("El título y la descripción son obligatorios.");
      return;
    }

    const task = {
      title,
      description,
      dueDate: dueDate || null,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""),
      completed: false
    };

    dispatch(createTask(task));
    setTitle('');
    setDescription('');
    setDueDate('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <input type="text" placeholder="Etiquetas (separadas por comas)" value={tags} onChange={e => setTags(e.target.value)} />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
