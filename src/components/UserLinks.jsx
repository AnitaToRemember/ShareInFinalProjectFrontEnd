import useListLinks from "../hooks/useListLinks";
import ErrorMessage from "./ErrorMessage";
import LinkList from "./LinkList";

// Functional component for displaying a user's links
function UserLinks({ token }) {
  // Destructuring links, loading state, error, and removeLink function from the useListLinks hook
  const { links, loading, error, removeLink } = useListLinks(token);

  // Displaying a loading message while links are being fetched
  if (loading) return <p>Loading links...</p>;
  // Displaying an error message if there's an issue fetching links
  if (error) return <ErrorMessage message={error} />;

  // Rendering the list of links using the LinkList component
  return <LinkList links={links} removeLink={removeLink} />;
}

export default UserLinks;
