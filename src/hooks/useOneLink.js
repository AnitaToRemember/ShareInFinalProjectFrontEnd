import { useState, useEffect } from "react";
import { getSingleLinkService } from "../services/links";

// Custom hook for fetching and managing a single link
function useOneLink(id) {
	// State for storing the single link
	const [link, setLink] = useState("");
	// State for tracking loading state during link fetching
	const [loading, setLoading] = useState(true);
	// State for handling and displaying errors
	const [error, setError] = useState("");

	// Effect to fetch the single link when the component mounts or when the id changes
	useEffect(() => {
		const loadPost = async () => {
			try {
				// Setting loading to true before fetching the link
				setLoading(true);
				// Fetching the single link using the provided id
				const data = await getSingleLinkService(id);
				// Setting the link in the state
				setLink(data.link);
			} catch (error) {
				// Handling and setting an error if link fetching fails
				setError(error.message);
			} finally {
				// Setting loading to false after link fetching (whether successful or not)
				setLoading(false);
			}
		};

		// Fetching the single link when the component mounts or when the id changes
		loadPost();
	}, [id]);

	// Returning the single link, loading state, and error
	return { link, loading, error };
}

export default useOneLink;
