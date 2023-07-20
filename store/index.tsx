"use client";

import { Dispatch, createContext, useContext } from "react";

type StateType = {
  editPostText: string;
  editCommentText: string;
};

export const initialState: StateType = {
  editPostText: "",
  editCommentText: ""
};

type Action = {
  type: string;
  payload: string;
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "clearEditPostText":
      return {
        ...state,
        editPostText: ""
      };
    case "clearEditCommentText":
      return {
        ...state,
        editCommentText: ""
      };

    case "setEditPostText":
      return {
        ...state,
        editPostText: action.payload
      };
    case "setEditCommentText":
      return {
        ...state,
        editCommentText: action.payload
      };

    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const useAppState = () => {
  return useContext(AppContext);
};
