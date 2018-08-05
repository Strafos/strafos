import { combineReducers } from "redux";

import * as ActionTypes from "./notePageConstants";
import * as CommonActionTypes from "../../commonConstants";
import { asyncStateReducer } from "../../utils/reduxUtils";

const asyncNoteReducer = asyncStateReducer({
  [ActionTypes.NOTE_LIST_REQUEST]: "pending",
  [ActionTypes.NOTE_LIST_FAILURE]: "error",
  [ActionTypes.NOTE_LIST_SUCCESS]: "complete",
});

const noteListReducer = (state, action) => {
  switch (action.type) {
    // prepend new article
    case CommonActionTypes.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        data: [...action.responseJson, ...state.data],
      };
    // case ActionTypes.UPDATE_ARTICLE_SUCCESS:
    //   return {
    //     ...state,
    //     data: [...]
    //   }
    default:
      return asyncNoteReducer(state, action);
  }
};

export default combineReducers({
  noteList: noteListReducer,
});
