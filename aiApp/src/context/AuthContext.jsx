import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"; // Ensure this path is correct based on your project structure

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: "",
};

const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
