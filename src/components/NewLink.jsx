import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/NewLink.css";

// Functional component for creating a new link
function NewLink({ addLink }) {
    // Destructuring token from the authentication context
    const { token } = useContext(AuthContext);
    // State for tracking loading state during link submission
    const [loading, setLoading] = useState(false);
    // State for handling and displaying errors
    const [error, setError] = useState("");

    // Function to handle the form submission
    const handleForm = async (e) => {
        e.preventDefault();

        try {
            // Setting loading to true before link submission
            setLoading(true);
            // Creating FormData object from the form data
            const data = new FormData(e.target);
            // Calling the addLink function to submit the new link
            addLink(data, token);

            // Resetting the form after successful link submission
            e.target.reset();
        } catch (error) {
            // Handling and setting an error if link submission fails
            setError(error.message);
        } finally {
            // Setting loading to false after link submission (whether successful or not)
            setLoading(false);
        }
    };

    // JSX for rendering the new link form
    return (
        <section className="new-link-from">
            <form className="new-link" onSubmit={handleForm}>
                <fieldset>
                    <h2>What are we sharing today?</h2>
                    {/* Input for link title */}
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />
                </fieldset>
                <fieldset>
                    {/* Input for link URL */}
                    <label htmlFor="url">URL</label>
                    <input type="url" name="url" id="url" required />
                </fieldset>
                <fieldset>
                    {/* Textarea for link description */}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows="4" cols="50" required />
                </fieldset>
                
                {/* Button to submit the new link */}
                <button className="posting-button">Share link</button>
                {/* Displaying error message if there's any */}
                {error ? <p>{error}</p> : null}
                {/* Displaying loading message during link submission */}
                {loading ? <p>Posting link...</p> : null}
            </form>
        </section>
    );
}
    
export default NewLink;
