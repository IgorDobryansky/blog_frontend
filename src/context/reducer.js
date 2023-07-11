import { createContext, useContext, useReducer } from "react";

const initialState = {
  url: "http://127.0.0.1:3001",
  token: null,
  user: null,
  notes: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "signout":
      localStorage.removeItem("auth-token");
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

const AppContext = createContext();

export const useAppState = () => {
  return useContext(AppContext);
};

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
