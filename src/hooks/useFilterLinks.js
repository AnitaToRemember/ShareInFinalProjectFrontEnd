import { useEffect, useState } from "react";
import { filterService } from "../services/utilities";

// Custom hook for handling filtered links logic
const useFilterLinks = () => {
  // State variables for sort criteria, keyword, filtered posts, and loading indicator
  const [sortBy, setSortBy] = useState("votes");
  const [keyword, setKeyword] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect hook to fetch filtered posts when sortBy or keyword changes
  useEffect(() => {
    // Function to fetch filtered posts asynchronously
    async function fetchFilteredPosts() {
      // Set loading indicator to true during data fetching
      setLoading(true);
      try {
        // Call filterService to get filtered posts based on sortBy and keyword
        const data = await filterService(sortBy, keyword);
        // Sort the posts based on the selected sortBy value
        const sortedPosts = sortPosts(data.links, sortBy);
        // Filter the sorted posts based on the keyword
        const filteredAndSortedPosts = filterPosts(sortedPosts, keyword);
        // Set the state with the filtered and sorted posts
        setFilteredPosts(filteredAndSortedPosts);
      } catch (error) {
        // Log an error message if fetching fails
        console.error("Error fetching filtered posts:", error);
      } finally {
        // Set loading indicator to false after data fetching completes
        setLoading(false);
      }
    }

    // Invoke the fetchFilteredPosts function
    fetchFilteredPosts();
  }, [sortBy, keyword]);

  // Function to sort the posts based on sortBy value
  const sortPosts = (posts, sortBy) => {
    return [...posts].sort((a, b) => {
      if (sortBy === "date") {
        // Sort by date if sortBy is "date"
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "votes") {
        // Sort by votes if sortBy is "votes"
        return b.votes - a.votes;
      }
      // Return 0 for other cases (no sorting)
      return 0;
    });
  };

  // Function to filter posts based on keyword
  const filterPosts = (posts, keyword) => {
    return posts.filter((post) =>
      // Case-insensitive search for the keyword in the post title
      post.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Return state variables and functions for external use
  return { sortBy, setSortBy, keyword, setKeyword, filteredPosts, loading };
};

export default useFilterLinks;
