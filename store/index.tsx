"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from "react";

type StateType = {
  token: string | null;
  user: User | null;
  notes: Note[] | null;
};

type User = {
  id: number;
  username: string;
};

type Note = {
  message: string;
};


export const initialState: StateType = {
  token: null,
  user:  null,
  notes: null
};

type Action = {
  type: string;
  payload: any;
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "signout":
      localStorage.removeItem("auth");
      return {
        ...state,
        token: null,
        user: null
      };
    case "signup":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };

    case "signin":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    case "getNotes":
      return {
        ...state,
        notes: action.payload
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


