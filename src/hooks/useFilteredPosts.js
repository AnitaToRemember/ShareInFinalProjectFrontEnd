import { useState, useEffect } from 'react';
import { filterService } from '../services/utilities';

const useFilteredPosts = (sortBy, keyword) => {
	// State to store filtered posts
	const [filteredPosts, setFilteredPosts] = useState([]);
	// State to track loading state
	const [loading, setLoading] = useState(false);

	// Effect to fetch and filter posts based on sortBy and keyword
	useEffect(() => {
		async function fetchFilteredPosts() {
			setLoading(true);
			try {
				// Fetch posts using filterService
				const data = await filterService(sortBy, keyword);
				// Sort the posts based on the selected sortBy value
				const sortedPosts = sortPosts(data.links, sortBy);
				// Filter the sorted posts based on the keyword
				const filteredAndSortedPosts = filterPosts(sortedPosts, keyword);
				// Update state with filtered posts
				setFilteredPosts(filteredAndSortedPosts);
			} catch (error) {
				console.error('Error fetching filtered posts:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchFilteredPosts();
	}, [sortBy, keyword]);

	// Function to sort the posts based on sortBy value
	const sortPosts = (posts, sortBy) => {
		return [...posts].sort((a, b) => {
			if (sortBy === 'date') {
				return new Date(b.createdAt) - new Date(a.createdAt);
			} else if (sortBy === 'votes') {
				return b.votes - a.votes;
			}
			return 0;
		});
	};

	// Function to filter posts based on keyword
	const filterPosts = (posts, keyword) => {
		return posts.filter((post) =>
			post.title.toLowerCase().includes(keyword.toLowerCase())
		);
	};

	// Return the state and functions needed by the component
	return { filteredPosts, loading };
};

export default useFilteredPosts;
