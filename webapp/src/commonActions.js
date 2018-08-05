import { asyncActionCreator } from "./utils/reduxUtils";

import * as ActionTypes from "./commonConstants";

import * as API from "./utils/api";

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
