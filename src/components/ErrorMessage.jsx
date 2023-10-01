import { Link } from "react-router-dom";

// Functional component for displaying an error message
function ErrorMessage({ message }) {
  return (
    // Section for styling the error message
    <section className="error">
      {/* Heading indicating that this is an error section */}
      <h1>Error</h1>
      
      {/* Displaying the error message passed as a prop */}
      <p>{message}</p>

      {/* Link to navigate back to the home page */}
      <Link to={"/"}>Go to home</Link>
    </section>
  );
}

export default ErrorMessage;
