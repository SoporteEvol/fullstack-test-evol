import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosClient from "../../../api/axiosClient";

const axiosClient = AxiosClient("http://localhost:4000/api");

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  loadingTasks: boolean;
  loadingDelete: boolean;
  loadingPostPut: boolean;
  errorFetchTasks: string | null;
  errorDelete: string | null;
  errorPostPut: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loadingTasks: false,
  loadingDelete: false,
  loadingPostPut: false,
  errorFetchTasks: null,
  errorDelete: null,
  errorPostPut: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadingTasks: (state) => {
      state.loadingTasks = true;
    },
    fetchedTasks: (state, action) => {
      state.tasks = action.payload;
      state.loadingTasks = false;
    },
    errorFetchedTasks: (state, action) => {
      state.errorFetchTasks = action.payload;
      state.loadingTasks = false;
    },
    loadingDelete: (state) => {
      state.loadingDelete = true;
    },
    errorDeleteTask: (state, action) => {
      state.errorDelete = action.payload;
      state.loadingDelete = false;
    },
    loadingPostPut: (state) => {
      state.loadingPostPut = true;
    },
    errorPostPutTask: (state, action) => { 
      state.errorPostPut = action.payload;
      state.loadingPostPut = false;
    },
  },
});

export const {
  loadingTasks,
  fetchedTasks,
  errorFetchedTasks,
  loadingDelete,
  errorDeleteTask,
  loadingPostPut,
  errorPostPutTask
} = tasksSlice.actions;

export const fetchTasks =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadingTasks());
      const response = await axiosClient.get<Task[]>("tasks");
      dispatch(fetchedTasks(response.data));
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        dispatch(errorFetchedTasks(error.response.data.message));
      } else if (error instanceof Error) {
        dispatch(errorFetchedTasks(error.message));
      } else {
        dispatch(errorFetchedTasks("An unknown error occurred"));
      }
    }
  };

export const deleteTask =
  (taskId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadingDelete());
      await axiosClient.delete(`tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        dispatch(errorDeleteTask(error.response.data.message));
      } else if (error instanceof Error) {
        dispatch(errorDeleteTask(error.message));
      } else {
        dispatch(errorDeleteTask("An unknown error occurred"));
      }
    }
  };

export const updateTask =
  ({ id, data }: { id: number; data: Partial<Task> }) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadingPostPut());
      await axiosClient.put(`tasks/${id}`, data);
      fetchTasks();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        dispatch(errorPostPutTask(error.response.data.message));
      } else if (error instanceof Error) {
        dispatch(errorPostPutTask(error.message));
      } else {
        dispatch(errorPostPutTask("An unknown error occurred"));
      }
    }
  };

export const createTask = (data: Partial<Task>) => async (dispatch: Dispatch): Promise<void> => {
  const axiosClient = AxiosClient("http://localhost:4000/api");
  try {
    dispatch(loadingPostPut());
    await axiosClient.post("tasks", data);
    fetchTasks();
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      dispatch(errorPostPutTask(error.response.data.message));
    } else if (error instanceof Error) {
      dispatch(errorPostPutTask(error.message));
    } else {
      dispatch(errorPostPutTask("An unknown error occurred"));
    }
  }
};

