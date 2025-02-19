import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

// Obtener tareas
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Crear tarea
export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

// Actualizar tarea
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
});

// Eliminar tarea
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
