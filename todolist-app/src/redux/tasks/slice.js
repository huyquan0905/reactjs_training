import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isloadingGet: false,
    isLoadingAdd: false,
  },
  reducers: {
    fetch: (state) => {
      state.isloadingGet = true;
    },
    getSuccess: (state, action) => {
      state.tasks = action.payload;
      state.isloadingGet = false;
    },

    addRequest: (state) => {
      state.isLoadingAdd = true;
    },
    addSuccess: (state, action) => {
      state.tasks.data.unshift(action.payload);
      state.isLoadingAdd = false;
    },

    updateRequest: () => {},
    updateSuccess: (state, action) => {
      const index = state.tasks.data.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks.data[index] = action.payload;
      }
    },

    toggleRequest: () => {},
    toggleSuccess: (state, action) => {
      const index = state.tasks.data.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks.data[index].completed = action.payload.completed;
      }
    },

    deleteRequest: () => {},
    deleteSuccess: (state, action) => {
      state.tasks.data = state.tasks.data.filter(
        (task) => task._id !== action.payload
      );
    },

    clearCompleted(state) {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },
  },
});

export const {
  fetch,
  getSuccess,
  addRequest,
  addSuccess,
  updateRequest,
  updateSuccess,
  toggleRequest,
  toggleSuccess,
  deleteRequest,
  deleteSuccess,
  clearCompleted,
} = taskSlice.actions;

export default taskSlice.reducer;
