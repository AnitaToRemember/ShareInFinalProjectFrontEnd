import { useEffect, useState } from "react";
import { getMyUserDataService } from "../services/user";

// Custom hook for fetching and managing user data
function useUser(id) {
	// State for storing user data
	const [user, setUser] = useState([]);
	// State for tracking loading state during user data fetching
	const [loading, setLoading] = useState(true);
	// State for handling and displaying errors
	const [error, setError] = useState("");

	// Effect to fetch user data when the component mounts or when the id changes
	useEffect(() => {
		const loadUser = async () => {
			try {
				// Setting loading to true before fetching user data
				setLoading(true);
				// Fetching user data using the provided id
				const data = await getMyUserDataService(id);
				// Setting the user data in the state
				setUser(data);
			} catch (error) {
				// Handling and setting an error if user data fetching fails
				setError(error.message);
			} finally {
				// Setting loading to false after user data fetching (whether successful or not)
				setLoading(false);
			}
		};

		// Fetching user data when the component mounts or when the id changes
		loadUser();
	}, [id]);

	// Returning user data, loading state, and error
	return { user, error, loading };
}

export default useUser;
