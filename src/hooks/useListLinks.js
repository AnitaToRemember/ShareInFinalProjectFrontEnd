import { useState, useEffect } from "react";
import { getAllLinksService, getUserLinksService, removeLinkService, sendLinkService } from "../services/links";

// Custom hook for fetching and managing links
function useListLinks(token) {
	// State for storing the list of links
	const [links, setLinks] = useState([]);
	// State for tracking loading state during link fetching
	const [loading, setLoading] = useState(false);
	// State for handling and displaying errors
	const [error, setError] = useState("");

	// Effect to fetch links when the component mounts or when the token changes
	useEffect(() => {
		const loadLinks = async () => {
			try {
				// Setting loading to true before link fetching
				setLoading(true);
				// Fetching user links if a token is provided, otherwise fetching all links
				const data = token ? await getUserLinksService(token) : await getAllLinksService();
				// Setting the links in the state
				setLinks(data.links);
			} catch (error) {
				// Handling and setting an error if link fetching fails
				setError(error.message);
			} finally {
				// Setting loading to false after link fetching (whether successful or not)
				setLoading(false);
			}
		};

		// Fetching links when the component mounts or when the token changes
		loadLinks();
	}, [token]);

	// Function to add a new link
	const addLink = async (data, token) => {
		// Sending the new link data to the server
		await sendLinkService({ data, token });
		// Fetching all links again to update the list
		const allNewLinks = await getAllLinksService();
		// Setting the updated links in the state
		setLinks(allNewLinks.links);
	};

	// Function to remove a link
	const removeLink = async (id, token) => {
		// Sending the link id to be removed to the server
		await removeLinkService({ id, token });
		// Fetching all links again to update the list
		const allNewLinks = await getAllLinksService();
		// Setting the updated links in the state
		setLinks(allNewLinks.links);
	};

	// Returning links, error, loading state, and link manipulation functions
	return { links, error, loading, addLink, removeLink };
}

export default useListLinks;
