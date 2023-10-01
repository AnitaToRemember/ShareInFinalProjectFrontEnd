import { useContext } from 'react';
import ShareInLogo from '../assets/ShareInLogo.png';
import '../styles/components/HeaderBar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// HeaderBar component represents the top navigation bar of the application.
// It displays the logo and title, and the link depends on whether the user is authenticated.
const HeaderBar = () => {
    // Get the user information from the AuthContext.
    const { user } = useContext(AuthContext);

    // Define the home link based on the user's authentication status.
    const homeLink = (user === undefined || user === null) ? "/" : "/home";

    return (
        <header id="header">
            {/* Link to the home page with the appropriate URL */}
            <Link to={homeLink}>
                <img className='header-logo' src={ShareInLogo} alt="ShareIn Logo" />
            </Link>
            <h1 className='title'>ShareIn</h1>
        </header>
    )
}

export default HeaderBar;
