// Importing createContext, useEffect, and useState hooks from React
import { createContext, useEffect, useState } from "react";
// Importing userServices from the services module
import { userServices } from "../services";

// Creating an authentication context
export const AuthContext = createContext();

// Functional component for providing authentication context to its children
export const AuthProvideComponent = ({ children }) => {
  // State for tracking the authentication token
  const [token, setToken] = useState(localStorage.getItem("token"));
  // State for storing user information
  const [user, setUser] = useState(null);

  // Effect to update localStorage when the token changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Effect to fetch user data when the token is set
  useEffect(() => {
    const getUserData = async () => {
      try {
        // Fetching user data using the token
        const data = await userServices.getMyUserDataService({ token });
        // Setting user information in the state
        setUser(data.user);
      } catch (error) {
        // Logging out if there's an error fetching user data
        logout();
      }
    };

    // Fetching user data only if there is a valid token
    if (token) getUserData();

  }, [token]);

  // Function to handle user login
  const login = (token) => {
    setToken(token);
  };

  // Function to handle user logout
  const logout = () => {
    setToken("");
    setUser(null);
  };

  // Providing the authentication context to its children
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
