import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { removeLinkService } from "../services/links";

// Custom hook for handling link deletion logic
function useRemoveLink() {
	// Get the authentication token from the context
	const { token } = useContext(AuthContext);

	// State variable for handling error messages during link deletion
	const [error, setError] = useState("");

	// Function to remove a link based on its ID
	const removeLink = async (linkId, onSuccess) => {
		// Log the linkId to the console for debugging purposes
		console.log(`2. to know what is ${linkId}`);

		try {
			// Call the removeLinkService from linksServices with linkId and token
			await removeLinkService({ linkId, token });

			// If onSuccess callback is provided, invoke it with the removed linkId
			if (onSuccess) {
				onSuccess(linkId);
			}
		} catch (error) {
			// If an error occurs during deletion, set the error state
			setError(error.message);
		}
	};

	// Return the removeLink function and the error state for external use
	return { removeLink, error };
}

export default useRemoveLink;
