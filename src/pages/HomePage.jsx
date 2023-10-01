import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NewLink from '../components/NewLink';
import useListLinks from '../hooks/useListLinks';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import LinkPost from '../components/LinkPost';
import Auth from '../components/Auth';

// Functional component for the HomePage
function HomePage() {
	// Destructuring the links, error, loading, addLink, and removeLink from the custom hook
	const { links, error, loading, addLink, removeLink } = useListLinks();
	// Destructuring the user from the authentication context
	const { user } = useContext(AuthContext);
	// Conditional rendering based on loading and error states
	if (loading) return <Loading />;
	if (error) return <ErrorMessage message={error} />;

	// JSX for rendering the HomePage
	return (
		<main>
			{/* Header section with authentication component */}
			<header>
				<Auth />
			</header>
			<section>
				{/* Conditional rendering of NewLink component if user is authenticated */}
				{user ? <NewLink addLink={addLink} /> : null}
				<h1>Latest posts</h1>
				{/* Mapping over links and rendering LinkPost component for each link */}
				{links.map((link) => (
					<LinkPost key={link.id} link={link} removeLink={removeLink} />
				))}
			</section>
		</main>
	);
}

export default HomePage;
