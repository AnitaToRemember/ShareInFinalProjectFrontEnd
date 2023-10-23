import { useParams } from 'react-router';
import useOneLink from '../hooks/useOneLink';
import LinkPost from '../components/LinkPost';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Footer from '../components/Footer';

// Functional component for the LinkPage
function LinkPage() {
    // Destructuring the id from the route parameters
    const { id } = useParams();
    // Destructuring the link, loading, and error from the custom hook
    const { link, loading, error } = useOneLink(id);

    // Conditional rendering based on loading and error states
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    // JSX for rendering the LinkPage
    return (
        <section>
            {/* Heading for the LinkPage */}
            <h1>Tweet</h1>
            {/* Rendering the LinkPost component for the single link */}
            <LinkPost link={link} />
            <Footer/>
        </section>
    );
}

export default LinkPage;
