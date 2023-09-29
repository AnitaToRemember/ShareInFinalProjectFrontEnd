import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext
import { starRatingService } from "../services/utilities";

function StarRating({ value, linkId, link }) {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null); 
  const { user, token } = useContext(AuthContext); // Get the user context

  const handleStarClick = async (clickedValue) => {
    try {
      if (!user) {
        // Handle the case where the user is not authenticated (you can display a message or redirect to login)
        console.error("User is not authenticated.");
        return;
      }
  
      if (user && link && user.id === link.userId ) {
        // Notify the user that they cannot like their own post
        console.error("You cannot like your own post.");
        return;
      }
  
      // Pass the user's token to the service function
      await starRatingService(clickedValue, linkId, token);

      // Update the selectedValue state after a successful vote
      setSelectedValue(clickedValue);
    } catch (error) {
      console.error("Error while voting:" , error);
    }
  };
  

  return (
    <div className="starRating">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredValue(starValue)}
          onMouseLeave={() => setHoveredValue(null)}
        >
          {starValue <= (hoveredValue || selectedValue || value) ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default StarRating;
