import axios from "axios";
import { Task } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${API_URL + '/task/'}`, {
      headers: { Accept: "*/*" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};


export const updateTaskStatus = async (id: number, completed: boolean): Promise<Task> => {
    try {
      const response = await axios.put<Task>(`${API_URL + '/task/' + id}`, { completed });
      return response.data;
    } catch (error) {
      console.error(`❌ Error actualizando la tarea con ID ${id}:`, error);
      throw error;
    }
  };

  export const createTask = async (newTask: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post<Task>(`${API_URL + '/task/'}`, newTask, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  export const deleteTask = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL + '/task/' + id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };