import '../styles/components/NavigationBar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLink, faSort, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

// Functional component for rendering the navigation bar
const NavigationBar = () => {
    // Destructuring user from the authentication context
    const { user } = useContext(AuthContext);
    // Determining the home link based on user authentication status
    const homeLink = (user === undefined || user === null) ? "/" : "/home";

    // JSX for rendering the navigation bar
    return (
        <nav className="navbar">
            {/* List of navigation items */}
            <ul className="nav-list">
                {/* Home link */}
                <li className="nav-item"><Link to={homeLink}><FontAwesomeIcon icon={faHouse} size="2xl" style={{ color: "#0093ff" }} /> </Link></li>
                
                {/* My Links link */}
                <li className="nav-item"><Link to="/mylinks"><FontAwesomeIcon icon={faLink} size="2xl" style={{ color: "#0093ff" }} /></Link></li>
                
                {/* Filter link */}
                <li className="nav-item"><Link to="/filter"><FontAwesomeIcon icon={faSort} size="2xl" style={{ color: "#0093ff" }} /></Link></li>
                
                {/* Account link */}
                <li className="nav-item"><Link to="/account"><FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#0093ff" }} /></Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
