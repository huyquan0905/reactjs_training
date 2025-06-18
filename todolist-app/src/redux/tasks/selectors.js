import { createSelector } from 'reselect';

const selectTasksState = (state) => state.tasks;

// Lấy danh sách task gốc
export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.tasks.data || [] 
);

export const selectActiveTaskCount = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((t) => !t.completed).length
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((t) => t.completed)
);
