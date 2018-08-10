import { asyncActionCreator } from "../../utils/reduxUtils";

import * as ActionTypes from "./dashboardPageConstants";

import * as API from "../../utils/api";

export const getKeepnotes = () =>
  asyncActionCreator(
    {
      pending: ActionTypes.KEEPNOTE_LIST_REQUEST,
      complete: ActionTypes.KEEPNOTE_LIST_SUCCESS,
      error: ActionTypes.KEEPNOTE_LIST_FAILURE,
    },
    API.getKeepnotes
  )();

export const createKeepnote = requestObj =>
  asyncActionCreator(
    {
      pending: ActionTypes.CREATE_KEEPNOTE_REQUEST,
      complete: ActionTypes.CREATE_KEEPNOTE_SUCCESS,
      error: ActionTypes.CREATE_KEEPNOTE_FAILURE,
    },
    API.createKeepnote
  )(requestObj);

export const updateKeepnote = (id, requestObj) =>
  asyncActionCreator(
    {
      pending: ActionTypes.UPDATE_KEEPNOTE_REQUEST,
      complete: ActionTypes.UPDATE_KEEPNOTE_SUCCESS,
      error: ActionTypes.UPDATE_KEEPNOTE_FAILURE,
    },
    API.updateKeepnote
  )(id, requestObj);

export const deleteKeepnote = id =>
  asyncActionCreator(
    {
      pending: ActionTypes.DELETE_KEEPNOTE_REQUEST,
      complete: ActionTypes.DELETE_KEEPNOTE_SUCCESS,
      error: ActionTypes.DELETE_KEEPNOTE_FAILURE,
    },
    API.deleteKeepnote
  )(id);
