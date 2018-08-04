import { asyncActionCreator } from "../../utils/reduxUtils";

import * as ActionTypes from "./notePageConstants";

import * as API from "../../utils/api";

export const getAllNotes = () =>
  asyncActionCreator(
    {
      pending: ActionTypes.NOTE_LIST_REQUEST,
      complete: ActionTypes.NOTE_LIST_SUCCESS,
      error: ActionTypes.NOTE_LIST_FAILURE,
    },
    API.getArticles
  )();
