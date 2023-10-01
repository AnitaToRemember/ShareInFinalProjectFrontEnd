import { useState, useEffect } from 'react';

// Functional component for toggling dark mode
function SwitchMode() {
  // State for tracking the dark mode state, initialized from local storage
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  );

  // Use useEffect to update the class and store the state in localStorage
  useEffect(() => {
    // Toggling the 'dark-mode' class on the body based on the isDarkMode state
    document.body.classList.toggle('dark-mode', isDarkMode);
    // Storing the isDarkMode state in localStorage
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  // Function to toggle the dark mode state
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Determine the text to display based on the current mode
  const buttonText = isDarkMode ? 'Light mode' : 'Dark mode';

  // JSX for rendering the switch mode component
  return (
    <div className="switch-mode">
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
        <span>{buttonText}</span>
      </label>
    </div>
  );
}

export default SwitchMode;
