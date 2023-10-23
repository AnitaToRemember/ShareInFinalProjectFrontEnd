import { useState } from 'react';
import useFilteredPosts from '../hooks/useFilteredPosts';
import LinkPost from '../components/LinkPost';
import '../styles/pages/FilterPage.css';
import Auth from '../components/Auth';
import Footer from '../components/Footer';

// Functional component for the FilterPage
function FilterPage() {
    // State to track sortBy and keyword
    const [sortBy, setSortBy] = useState('votes');
    const [keyword, setKeyword] = useState('');

    // Use the custom hook to get filtered posts and loading state
    const { filteredPosts, loading } = useFilteredPosts(sortBy, keyword);

    // JSX for rendering the FilterPage
    return (
        <section className="filter-container">
            {/* Header section with authentication component */}
            <header>
                <Auth />
            </header>
            {/* Title for the FilterPage */}
            <h2 className="filter-title">Filter Posts</h2>
            {/* Select input for sorting posts */}
            <div className="filter-select-container">
                <label htmlFor="sortBy" className="filter-label">
                    Sort by:
                </label>
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
            {/* Input for filtering posts by keyword */}
            <div className="filter-input-container">
                <label htmlFor="keyword" className="filter-label">
                    Filter by Keyword:
                </label>
                <input
                    type="text"
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="filter-input"
                />
            </div>

            {/* Loading message or list of filtered posts */}
            {loading ? (
                <p className="filter-loading">Loading...</p>
            ) : (
                <ul className="filter-post-list">
                    {filteredPosts.map((link) => (
                        <li key={link.id} className="filter-post-item">
                            {/* Rendering LinkPost component for each filtered link */}
                            <LinkPost link={link} />
                        </li>
                    ))}
                </ul>
            )}
            <Footer/>
        </section>
    );
}

export default FilterPage;
