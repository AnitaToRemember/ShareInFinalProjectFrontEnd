import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StarRating from "./StarRating";
import "../styles/components/LinkPost.css";

// Functional component for rendering an individual link post
function LinkPost({ link, removeLink }) {
  // Destructuring user and token from the authentication context
  const { user, token } = useContext(AuthContext);
  // State for handling errors during link removal
  const [error, setError] = useState("");

  // Asynchronous function to handle link deletion
  const handleDeleteClick = async () => {
    // Displaying a confirmation dialog before link deletion
    if (window.confirm("Are you sure?")) {
      try {
        // Attempting to remove the link using the provided function
        await removeLink(link.id, token);
      } catch (error) {
        // Handling and setting an error if link removal fails
        setError(error.message);
      }
    }
  };

  // JSX for rendering the individual link post
  return (
    <section className="list-all-links">
      <div className="link-post">
        {/* Displaying the link title */}
        <h2 className="title-post">
          {link.title}
        </h2>

        {/* Creating a link to the URL with the provided URL */}
        <Link to={link.url} className="url"> 
          URL: {link.url}
        </Link>

        {/* Displaying the link description */}
        <p className="description">
          Description: {link.description}
        </p>

        {/* Displaying the username of the link poster */}
        <span className="username">
          @{link.username}
        </span>
        
        {/* Displaying star ratings for the link */}
        <span className="votes">
          <StarRating value={link.votes} linkId={link.id} link={link} />
        </span> 

        {/* Creating a link to the detailed view of the link */}
        <Link to={`/links/${link.id}`} className="date">
          Posted on: {new Date(link.createdAt).toLocaleString()}
        </Link>
        
        {/* Conditional rendering for link deletion button based on user and ownership */}
        {user && link && user.id === link.userId ? (
          <section>
            <button onClick={handleDeleteClick}>Delete link 🗑️</button>
            {/* Displaying the error message, if any */}
            {error && <p>{error}</p>}
          </section>
        ) : null}
      </div>
    </section>
  );
}

export default LinkPost;
