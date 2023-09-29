import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UserLinks from "../components/UserLinks";
import "../styles/pages/MyLinks.css"
import Auth from '../components/Auth'
import { linksServices } from "../services";

function MyLinks() { 
	const { user, token } = useContext(AuthContext);
	const [userPosts, setUserPosts] = useState([]);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		async function fetchUserPosts() {
		setLoading(true);
		try {
			if (user) {
				// Only fetch user posts if the user is authenticated
				const data = await linksServices.getUserLinksService(token);
				setUserPosts(data.links);
			}
		} catch (error) {
			console.error("Error fetching user posts:", error);
		} finally {
			setLoading(false);
		}
	}
	
		fetchUserPosts();
	}, [user, token]);
	
		return (
			<div>		
				<header>
					<Auth />
				</header>

				{loading ? (
		<p className="my-links-loading">Loading...</p>
	) : (
		<div className="all-links">
			<h2 className="user-title">
			{user ? `Links posted by: ${user.username}` : "Please log in to see your links."}
		</h2>
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

export default MyLinks