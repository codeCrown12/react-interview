import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      localStorage.setItem("user", action.payload.user_id);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const checkToken = async () => {
      const role = localStorage.getItem("role");
      if(role) {
        const isExpired = await sdk.check(role);
        if(isExpired) {
          tokenExpireError(dispatch, "TOKEN_EXPIRED");
        }
      }
    }
    checkToken()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
