import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from './config';

// Definir la interfaz de tarea
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Definir el estado inicial
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null
};

// Obtener tareas
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener tareas");
  }
});

// Crear tarea
export const createTask = createAsyncThunk('tasks/createTask', async (task: Partial<Task>, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al crear tarea");
  }
});

// Actualizar tarea
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }: { id: number; task: Partial<Task> }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, task); 
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al actualizar tarea");
  }
});

// Eliminar tarea
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Error al eliminar tarea");
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => { 
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Task
      .addCase(createTask.pending, (state) => { 
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => { 
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => { 
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => { 
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
