import { combineReducers } from "redux";

import * as ActionTypes from "./dashboardPageConstants";
import * as CommonActionTypes from "../../commonConstants";
import { asyncStateReducer } from "../../utils/reduxUtils";

const asyncNoteReducer = asyncStateReducer({
  [ActionTypes.KEEPNOTE_LIST_REQUEST]: "pending",
  [ActionTypes.KEEPNOTE_LIST_FAILURE]: "error",
  [ActionTypes.KEEPNOTE_LIST_SUCCESS]: "complete",
});

const keepnoteListReducer = (state, action) => {
  switch (action.type) {
    // prepend new article
    case CommonActionTypes.CREATE_KEEPNOTE_SUCCESS:
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
  keepnoteList: keepnoteListReducer,
});
