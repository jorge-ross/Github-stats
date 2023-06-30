import { createContext, useContext, useEffect, useState } from "react";

import { createUser, getUser } from "../services/user-service";
import * as auth from "../services/auth-service";
import { tokenKey } from "../config";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // getUser().then(user => setUser(user)).catch(error => console.log(error))
    getUser().then(setUser).catch(console.log);
  }, []);

  function login(credentials) {
    console.log("Login");
    auth.login(credentials).then(setUser).catch(console.log);
  }

  function signup(userData) {
    createUser(userData).then(setUser).catch(console.log);
  }

  function logout() {
    auth.logout().then(() => {
      sessionStorage.removeItem(tokenKey);
      setUser(null);
    });
  }

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
