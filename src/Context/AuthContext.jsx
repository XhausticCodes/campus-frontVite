import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "../Services/LoginService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Firstly checking localStorage for quick authentication
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("AuthContext - User from localStorage:", userData);
          setCurrentUser(userData);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("AuthContext - Error parsing stored user:", error);
          localStorage.removeItem("currentUser");
        }
      }

      // If no stored user, then checking it from getUserDetails method..
      const response = await getUserDetails();
      if (response.data) {
        console.log("AuthContext - User data from API:", response.data);
        setCurrentUser(response.data);
        setIsAuthenticated(true);
        // Now that's a problem, we're storing the user in localstorage for future sessions, but there's no expiry time for it. And Creating a Infinite login session. T_T
        localStorage.setItem("currentUser", JSON.stringify(response.data));
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("AuthContext - Error checking auth status:", error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
