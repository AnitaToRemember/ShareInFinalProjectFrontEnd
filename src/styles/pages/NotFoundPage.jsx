import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// NotFoundPage component represents a page that is displayed when the requested page is not found.
// It displays a message indicating that the page was not found and provides a link to the home page.
const NotFoundPage = () => {
    return (
        <section>
            <h1>Page not found</h1>
            <p>
                <Link to="/">Go to home page</Link>
            </p>
            <Footer/>
        </section>
    );
};

export default NotFoundPage;
