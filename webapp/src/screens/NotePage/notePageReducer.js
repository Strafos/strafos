import { combineReducers } from "redux";

import * as ActionTypes from "./notePageConstants";
import { asyncStateReducer } from "../../utils/reduxUtils";

const asyncNoteReducer = asyncStateReducer({
  [ActionTypes.NOTE_LIST_REQUEST]: "pending",
  [ActionTypes.NOTE_LIST_FAILURE]: "error",
  [ActionTypes.NOTE_LIST_SUCCESS]: "complete",
});

const noteListReducer = (state, action) => {
  switch (action.type) {
    default:
      return asyncNoteReducer(state, action);
  }
};

export default combineReducers({
  noteList: noteListReducer,
});
