import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { starRatingService } from "../services/utilities";

// Functional component for rendering a star rating
function StarRating({ value, linkId, link }) {
  // State for the currently hovered star value
  const [hoveredValue, setHoveredValue] = useState(null);
  // State for the selected star value
  const [selectedValue, setSelectedValue] = useState(null); 
  // State for displaying error messages related to star rating
  const [errorMessage, setErrorMessage] = useState('');
  // Destructuring user and token from the authentication context
  const { user, token } = useContext(AuthContext);

  // Function to handle a star click
  const handleStarClick = async (clickedValue) => {
    try {
      // Check if the user is not authenticated
      if (!user) {
        setErrorMessage("User is not authenticated.");
        return;
      }

      // Check if the user is trying to like their own post
      if (user && link && user.id === link.userId ) {
        setErrorMessage("You cannot like your own post.");
        return;
      }

      // Call the star rating service function with the clicked value and user token
      await starRatingService(clickedValue, linkId, token);

      // Update the selectedValue state after a successful vote
      setSelectedValue(clickedValue);
    } catch (error) {
      // Set an error message in case of voting failure
      setErrorMessage(error.message);
    }
  };

  // JSX for rendering the star rating component
  return (
    <div className="starRating">
      {/* Mapping through star values and rendering each star */}
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredValue(starValue)}
          onMouseLeave={() => setHoveredValue(null)}
        >
          {/* Displaying a filled star if it's less than or equal to the current value */}
          {starValue <= (hoveredValue || selectedValue || value) ? "⭐" : "☆"}
        </span>
      ))}
      {/* Displaying an error message if there's any */}
      {errorMessage && <p className="error"> {errorMessage} </p>}
    </div>
  );
}

export default StarRating;
