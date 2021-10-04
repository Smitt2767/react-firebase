import { createSlice } from "@reduxjs/toolkit";
import constants from "../../../constants";

const initialState = {
  completedProjects: [],
  inProgressProjects: [],
  notCompletedProjects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      if (action.payload.status === constants.todoStatus.notCompleted)
        state.notCompletedProjects = [
          ...state.notCompletedProjects,
          ...action.payload.data,
        ];
      else if (action.payload.status === constants.todoStatus.completed)
        state.completedProjects = [
          ...state.completedProjects,
          ...action.payload.data,
        ];
      else
        state.inProgressProjects = [
          ...state.inProgressProjects,
          ...action.payload.data,
        ];
    },
    resetProjects: () => initialState,
  },
});

export const { setProjects, resetProjects } = projectSlice.actions;
export default projectSlice.reducer;
