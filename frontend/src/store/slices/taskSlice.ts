import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from "../services/taskService";
import { RootState } from "../store";
import { Task } from "../types/task";


interface TaskState {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  status: "idle",
  error: null,
};


export const fetchTasksThunk = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    return await fetchTasks();
  }
);


export const updateTaskStatusThunk = createAsyncThunk<Task, { id: number; completed: boolean }>(
  "tasks/updateTaskStatus",
  async ({ id, completed }) => {
    return await updateTaskStatus(id, completed);
  }
);

export const createTaskThunk = createAsyncThunk<Task, Omit<Task, "id">>(
    "tasks/createTask",
    async (newTask, { rejectWithValue }) => {
      try {
        return await createTask(newTask);
      } catch (error) {
        return rejectWithValue("Error al crear la tarea");
      }
    }
  );

  export const deleteTaskThunk = createAsyncThunk<void, number>(
    "tasks/deleteTask",
    async (id: number) => {
      return await deleteTask(id)
    }
  );


export const selectTaskById = (state: RootState, id: number) =>
    state.tasks.items.find((task) => task.id === id);
  


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasksThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error desconocido";
      })
      builder
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.meta.arg);
      })

      .addCase(updateTaskStatusThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; 
        }
      });
  },
});

export default taskSlice.reducer;


export const selectTasks = (state: RootState) => state.tasks.items;
