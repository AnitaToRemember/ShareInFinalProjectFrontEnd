import { useState, useEffect } from "react";
import { getSingleLinkService } from "../services/links";

// Custom hook for handling logic related to a single link
function useOneLink(id) {
	// State variables for storing the link, loading state, and error messages
	const [link, setLink] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Effect hook to fetch a single link based on the provided ID
	useEffect(() => {
		const loadPost = async () => {
			try {
				// Set loading state to true before fetching the link
				setLoading(true);

				// Fetch a single link based on the provided ID
				const data = await getSingleLinkService(id);

				// Update the link state with the fetched data
				setLink(data.link);
			} catch (error) {
				// Set error state if an error occurs during the fetching process
				setError(error.message);
			} finally {
				// Set loading state to false after fetching is complete
				setLoading(false);
			}
		};

		// Call the loadPost function when the ID changes
		loadPost();
	}, [id]);

	// Return the link, loading state, and error for external use
	return { link, loading, error };
}

export default useOneLink;
