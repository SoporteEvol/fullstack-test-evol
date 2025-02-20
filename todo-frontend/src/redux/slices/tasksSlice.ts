import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, getTask, createTask, updateTask, deleteTask, getTags } from "../../services/taskService";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Tag {
  name: string;
}

interface TasksState {
  tasks: Task[];
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  tags: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await getTasks();
});

export const fetchTags = createAsyncThunk("tasks/fetchTags", async () => {
  return await getTags();
});

export const fetchTask = createAsyncThunk("tasks/fetchTask", async (id: string) => {
  return await getTask(id);
});

export const addTask = createAsyncThunk("tasks/addTask", async (task: { 
  title: string,
  description: string,
  completed: boolean,
  tags: string[],
  dueDate: Date,
}) => {
  return await createTask(task);
});

export const editTask = createAsyncThunk("tasks/editTask", async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
  console.log("updates", updates);
  return await updateTask(id, updates);
});

export const changeStatusTask = createAsyncThunk("tasks/editTask", async ({id, completed }: {id: string; completed: boolean}) => {
  console.log("completed", id);
  return await updateTask(id, { completed });
})

export const removeTask = createAsyncThunk("tasks/removeTask", async (id: string) => {
  await deleteTask(id);
  return id;
});

// Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener tareas";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
