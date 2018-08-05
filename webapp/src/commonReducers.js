import { combineReducers } from "redux";

import * as ActionTypes from "./commonConstants";
import { asyncStateReducer } from "./utils/reduxUtils";

const asyncNoteReducer = asyncStateReducer({
  [ActionTypes.NOTE_LIST_REQUEST]: "pending",
  [ActionTypes.NOTE_LIST_FAILURE]: "error",
  [ActionTypes.NOTE_LIST_SUCCESS]: "complete",
});

const newArticleReducer = asyncStateReducer({
  [ActionTypes.CREATE_ARTICLE_REQUEST]: "pending",
  [ActionTypes.CREATE_ARTICLE_FAILURE]: "error",
  [ActionTypes.CREATE_ARTICLE_SUCCESS]: "complete",
});

const noteListReducer = (state, action) => {
  switch (action.type) {
    default:
      return asyncNoteReducer(state, action);
  }
};

export default combineReducers({ noteListReducer });
