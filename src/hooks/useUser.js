// Import necessary hooks and services for managing user data
import { useEffect, useState } from "react";
import { getMyUserDataService } from "../services/user";

// Custom hook for handling logic related to user data
function useUser(id) {
	// State variables for storing user data, loading state, and error messages
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Effect hook to fetch user data based on the provided ID
	useEffect(() => {
		const loadUser = async () => {
			try {
				// Set loading state to true before fetching user data
				setLoading(true);

				// Fetch user data based on the provided ID
				const data = await getMyUserDataService(id);

				// Update the user state with the fetched data
				setUser(data);
			} catch (error) {
				// Set error state if an error occurs during the fetching process
				setError(error.message);
			} finally {
				// Set loading state to false after fetching is complete
				setLoading(false);
			}
		};

		// Call the loadUser function when the ID changes
		loadUser();
	}, [id]);

	// Return the user data, loading state, and error for external use
	return { user, error, loading };
}

// Export the custom hook for use in other components
export default useUser;
