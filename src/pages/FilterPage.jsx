import LinkPost from "../components/LinkPost";
import "../styles/pages/FilterPage.css";
import Auth from "../components/Auth";
import useFilterLinks from "../hooks/useFilterLinks";

// Define the main component for the Filter Page
function FilterPage() {
  // Destructure values and functions from the custom hook
  const {
    sortBy,
    setSortBy,
    keyword,
    setKeyword,
    filteredPosts,
    loading,
  } = useFilterLinks();

  // Render the Filter Page
  return (
    <div className="filter-container">
      {/* Display the authentication header */}
      <header>
        <Auth />
      </header>
      {/* Page title */}
      <h2 className="filter-title">Filter Posts</h2>
      {/* Container for the sort dropdown */}
      <div className="filter-select-container">
        <label htmlFor="sortBy" className="filter-label">
          Sort by:
        </label>
        {/* Dropdown for selecting sort criteria */}
        <select
          id="sortBy"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="filter-select"
        >
          <option value="date">Date</option>
          <option value="votes">Rating</option>
        </select>
      </div>
      {/* Container for the keyword input */}
      <div className="filter-input-container">
        <label htmlFor="keyword" className="filter-label">
          Filter by Keyword:
        </label>
        {/* Input field for entering the keyword */}
        <input
          type="text"
          id="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Display loading message while data is being fetched */}
      {loading ? (
        <p className="filter-loading">Loading...</p>
      ) : (
        // Render the list of filtered posts
        <ul className="filter-post-list">
          {filteredPosts.map((link) => (
            <li key={link.id} className="filter-post-item">
              {/* Render each filtered post using LinkPost component */}
              <LinkPost link={link} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterPage;
