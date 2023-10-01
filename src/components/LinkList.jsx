import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LinkPost from "./LinkPost";

// Functional component for rendering a list of links
function LinkList({ links, removeLink }) {
  // Destructuring user from the authentication context
  const { user } = useContext(AuthContext);

  // Filtering links based on user ownership
  const userLinks = links.filter((link) => user && link.userId === user.id);

  // JSX for rendering the list of links
  return userLinks.length ? (
    // Displaying a list of links if user-specific links are present
    <ul className="link-list">
      {userLinks.map((link) => {
        return (
          // Rendering individual link posts using the LinkPost component
          <li key={link.id} className="user-link">
            <LinkPost link={link} removeLink={removeLink} />
          </li>
        );
      })}
    </ul>
  ) : (
    // Displaying a message if no user-specific links are found
    <p>There are no links...</p>
  );
}

export default LinkList;
