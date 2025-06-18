extraReducers: (builder) => {
  builder
    .addCase('tasks/get', (state) => {
      state.isloadingGet = true;
    })
    .addCase('tasks/getSuccess', (state, action) => {
      state.tasks = action.payload;
      state.isloadingGet = false;
    })

    .addCase('tasks/add', (state) => {
      state.isLoadingAdd = true;
    })
    .addCase('tasks/addSuccess', (state, action) => {
      state.tasks.data.unshift(action.payload);
      state.isLoadingAdd = false;
    })

    .addCase('tasks/updateSuccess', (state, action) => {
      const id = state.tasks.data.findIndex(
        (t) => t._id === action.payload._id
      );
      if (id !== -1) {
        state.tasks.data[id] = action.payload;
      }
    })

    .addCase('tasks/toggleSuccess', (state, action) => {
      const index = state.tasks.data.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks.data[index].completed = action.payload.completed;
      }
    })

    .addCase('tasks/deleteSuccess', (state, action) => {
      state.tasks.data = state.tasks.data.filter(
        (task) => task._id !== action.payload
      );
    });
};
