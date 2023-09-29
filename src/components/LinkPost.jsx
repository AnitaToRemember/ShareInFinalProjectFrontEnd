import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StarRating from "./StarRating";
import "../styles/components/LinkPost.css"

function LinkPost ({ link, removeLink }) {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await removeLink(link.id, token)
        } catch (error) {
        setError(error.message);
      }
    }
  };
  
  return (
    <section className="list-all-links">
      <div className="link-post">
        <h2 className="title">
          {link.title}
        </h2>

        <Link to={link.url} className="url"> 
        URL: {link.url}
        </Link>

        <p className="description">
          Description: {link.description}
        </p>

        <span className="username">
          @{link.username}
        </span>
        
        <span className="votes">
          <StarRating  value={link.votes} linkId={link.id} link={link}/>
        </span> 

        <Link to={`/links/${link.id}`} className="date">
          Posted on: {new Date(link.createdAt).toLocaleString()}
        </Link>
        
        {user && link && user.id === link.userId ? (
          <section>
            <button onClick={handleDeleteClick}>Delete link 🗑️</button>
            {error && <p>{error}</p>}
          </section>
        ) : null}

      </div>
    </section>
  );
}


export default LinkPost