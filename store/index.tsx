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

// const auth = JSON.parse(localStorage.getItem("auth"));
// console.log(auth);

const initialState: StateType = {
  token: null,
  user:  null,
  notes: null
};

type Action = {
  type: string;
  payload: any;
};

const reducer = (state = initialState, action: Action) => {
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

const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

export const useAppState = () => {
  return useContext(AppContext);
};

export const AppProvider = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
