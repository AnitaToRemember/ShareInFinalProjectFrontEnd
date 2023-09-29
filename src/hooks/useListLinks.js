import { useState, useEffect } from "react";
import { getAllLinksService, getUserLinksService, removeLinkService, sendLinkService } from "../services/links";

// Custom hook for handling link listing, addition, and removal logic
function useListLinks(token) {
	// State variables for storing links, loading state, and error messages
	const [links, setLinks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Effect hook to fetch links based on the provided token
	useEffect(() => {
		const loadLinks = async () => {
			try {
				// Set loading state to true before fetching links
				setLoading(true);

				// Fetch links based on the presence of a token (user-specific or all links)
				const data = token
					? await getUserLinksService(token)
					: await getAllLinksService();

				// Update the links state with the fetched data
				setLinks(data.links);
			} catch (error) {
				// Set error state if an error occurs during the fetching process
				setError(error.message);
			} finally {
				// Set loading state to false after fetching is complete
				setLoading(false);
			}
		};

		// Call the loadLinks function when the token changes
		loadLinks();
	}, [token]);

	// Function to add a new link to the list
	const addLink = async (data, token) => {
		// Call the sendLinkService to add the link
		await sendLinkService({ data, token });

		// Fetch all links again to update the links state
		const allNewLinks = await getAllLinksService();
		setLinks(allNewLinks.links);
	};

	// Function to remove a link from the list
	const removeLink = async (id, token) => {
		// Log the link ID to the console for debugging purposes
		console.log(id);

		// Call the removeLinkService to remove the link
		await removeLinkService({ id, token });

		// Fetch all links again to update the links state
		const allNewLinks = await getAllLinksService();
		setLinks(allNewLinks.links);
	};

	// Return the links, error, loading state, and functions for external use
	return { links, error, loading, addLink, removeLink };
}

export default useListLinks;
