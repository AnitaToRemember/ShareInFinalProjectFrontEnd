import { createContext, useContext, useState } from 'react';

// Creating a theme context
const ThemeContext = createContext();

// Custom hook for using theme context
export const UseTheme = () => {
  // Accessing the theme context
  const context = useContext(ThemeContext);
  // Throwing an error if useTheme is not used within a ThemeProvider
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  // Returning the context
  return context;
};

// Functional component for providing theme context to its children
export const ThemeProvider = ({ children }) => {
  // State for tracking the dark mode state, initialized from local storage
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  );

  // Function to toggle the dark mode state
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Providing the theme context to its children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
