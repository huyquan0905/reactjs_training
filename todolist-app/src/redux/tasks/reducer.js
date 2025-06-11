// src/redux/tasks/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getTasks, addTask, updateTask, toggleTask, deleteTask } from "./thunk";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isloadingGet: false,
    isLoadingAdd: false,
  },
  reducers: {
    clearCompleted(state) {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },
  },
  extraReducers: (builder) => {
    // Get tasks
    builder
      .addCase(getTasks.pending, (state) => {
        state.isloadingGet = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isloadingGet = false;
      })

      // Create task
      .addCase(addTask.pending, (state) => {
        state.isLoadingAdd = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.data.unshift(action.payload);
        state.isLoadingAdd = false;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const id = state.tasks.data.findIndex(
          (t) => t._id === action.payload._id
        );
        if (id !== -1) {
          state.tasks[id] = action.payload;
        }
      })

      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.data.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks.data[index].completed = action.payload.completed;
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.data = state.tasks.data.filter(
          (task) => task._id !== action.payload
        );
      });
  },
});

export const { clearCompleted } = taskSlice.actions;
export default taskSlice.reducer;
