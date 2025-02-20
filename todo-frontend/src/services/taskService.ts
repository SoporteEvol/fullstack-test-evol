import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data.data;
};

export const getTask = async (id: string) => {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data.data;
};

export const getTags = async () => {
    const response = await axios.get(`${API_URL}/tasks/tags`);
    return response.data.data;
}

export const createTask = async (task: { 
    title: string,
    description: string,
    completed: boolean,
    tags?: string[],
    dueDate: Date,
}) => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
};

export const updateTask = async (id: string, updates: { title?: string; completed?: boolean }) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
    return response.data;
};

export const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
};