import apiClient from "./apiClient.js";

export const getTasks = async () => (await apiClient.get("/tasks")).data;
export const getTask = async (id) => (await apiClient.get(`/tasks/${id}`)).data;
export const createTask = async (task) => (await apiClient.post("/tasks", task)).data;
export const updateTask = async (id, task) => (await apiClient.put(`/tasks/${id}`, task)).data;
export const patchTask = async (id, task) => (await apiClient.patch(`/tasks/${id}`, task)).data;
export const deleteTask = async (id) => (await apiClient.delete(`/tasks/${id}`)).status;