import axios from 'axios';
import type { Agent, Task, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAgents = async (): Promise<ApiResponse<Agent[]>> => {
  try {
    const response = await api.get('/agents');
    return { data: response.data };
  } catch (error) {
    return { data: [], error: 'Failed to fetch agents' };
  }
};

export const fetchTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await api.get('/tasks');
    return { data: response.data };
  } catch (error) {
    return { data: [], error: 'Failed to fetch tasks' };
  }
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<ApiResponse<Task>> => {
  try {
    const response = await api.post('/tasks', task);
    return { data: response.data };
  } catch (error) {
    return { data: {} as Task, error: 'Failed to create task' };
  }
};