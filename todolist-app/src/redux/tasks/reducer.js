// src/redux/tasks/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getTasks, addTask, updateTask } from "./thunk";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isloadingGet: false,
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
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.data.unshift(action.payload);
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const id = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (id !== -1) {
          state.tasks[id] = action.payload;
        }
      });
  },
});

export const { clearCompleted } = taskSlice.actions;
export default taskSlice.reducer;
