import { createSelector } from "reselect";
import { STATUS_TASK } from "../../constants/const";

export const selectTasksState = (state) => state.tasks;
export const selectFilter = (state) => state.filter || STATUS_TASK.ALL; 

export const selectTasksData = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.data ?? []
);

export const selectFilteredTasks = createSelector(
  [selectTasksData, (_, filter) => filter],
  (tasks, filter) => {
    switch (filter) {
      case STATUS_TASK.ACTIVE:
        return tasks.filter((task) => !task.completed);
      case STATUS_TASK.COMPLETED:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }
);


export const selectItemsLeft = createSelector(
  [selectTasksData],
  (tasks) => tasks.filter((task) => !task.completed).length
);
