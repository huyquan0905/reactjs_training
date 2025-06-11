import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api/helpers/api_helper";
import {
  TASKS_GET,
  TASK_ADD,
  TASK_UPDATE,
  TASKS_REMOVE,
} from "../../constants/url";

export const getTasks = createAsyncThunk("tasks/get", async () => {
  const response = await apiClient.get(TASKS_GET);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/add", async (task) => {
  const response = await apiClient.post(TASK_ADD, task);
  return response.data.data;
});

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, text }) => {
    const payload = { _id: id, text };
    await apiClient.put(TASK_UPDATE, payload);
    return { ...payload };
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggle",
  async ({ id, completed }) => {
    const payload = { _id: id, completed };
    await apiClient.put(TASK_UPDATE, payload);
    return payload;
  }
);

export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await apiClient.delete(TASKS_REMOVE, { data: { _id: id } });
  return id;
});
