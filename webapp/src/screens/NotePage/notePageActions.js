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

export const createArticle = url =>
  asyncActionCreator(
    {
      pending: ActionTypes.CREATE_ARTICLE_REQUEST,
      complete: ActionTypes.CREATE_ARTICLE_SUCCESS,
      error: ActionTypes.CREATE_ARTICLE_FAILURE,
    },
    API.createArticle
  )(url);

export const updateArticle = (id, requestObj) =>
  asyncActionCreator(
    {
      pending: ActionTypes.UPDATE_ARTICLE_REQUEST,
      complete: ActionTypes.UPDATE_ARTICLE_SUCCESS,
      error: ActionTypes.UPDATE_ARTICLE_FAILURE,
    },
    API.updateArticle
  )(id, requestObj);

export const deleteArticle = id =>
  asyncActionCreator(
    {
      pending: ActionTypes.DELETE_ARTICLE_REQUEST,
      complete: ActionTypes.DELETE_ARTICLE_SUCCESS,
      error: ActionTypes.DELETE_ARTICLE_FAILURE,
    },
    API.deleteArticle
  )(id);
