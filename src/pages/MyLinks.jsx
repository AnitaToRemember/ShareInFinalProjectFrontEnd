import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserLinks from '../components/UserLinks';
import '../styles/pages/MyLinks.css';
import Auth from '../components/Auth';
import { getUserLinksService } from '../services/links';

// Functional component for MyLinks page
function MyLinks() {
    // Destructuring user and token from AuthContext
    const { user, token } = useContext(AuthContext);
    // State to store user posts and loading state
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect to fetch user posts when the component mounts or user/token changes
    useEffect(() => {
        async function fetchUserPosts() {
            // Setting loading state to true before fetching user posts
            setLoading(true);
            try {
                // Fetching user posts if the user is authenticated
                if (user) {
                    const data = await getUserLinksService(token);
                    setUserPosts(data.links);
                }
            } catch (error) {
                // Handling and logging errors if fetching user posts fails
                console.error('Error fetching user posts:', error);
            } finally {
                // Setting loading state to false after fetching user posts
                setLoading(false);
            }
        }

        // Calling the fetchUserPosts function
        fetchUserPosts();
    }, [user, token]);

    // JSX for rendering MyLinks page
    return (
        <div>
            {/* Header section with authentication component */}
            <header>
                <Auth />
            </header>

            {/* Conditional rendering based on loading state */}
            {loading ? (
                <p className="my-links-loading">Loading...</p>
            ) : (
                <div className="all-links">
                    {/* Title for the user's links */}
                    <h2 className="user-title">
                        {user
                            ? `Links posted by: ${user.username}`
                            : 'Please log in to see your links.'}
                    </h2>
                    {/* Mapping over user posts and rendering UserLinks component for each link */}
                    {userPosts.map((link) => (
                        <li key={link.id} className="user-link">
                            <UserLinks token={token} />
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyLinks;
