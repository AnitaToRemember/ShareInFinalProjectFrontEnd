// Sidebar component
import '../styles/components/Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLink, faSort, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const homeLink = user ? '/home' : '/';

    return (
        <aside className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item"><Link to={homeLink}><FontAwesomeIcon icon={faHouse} size="2x" style={{ color: "#0093ff" }} /></Link></li>
                <li className="sidebar-item"><Link to="/mylinks"><FontAwesomeIcon icon={faLink} size="2x" style={{ color: "#0093ff" }} /></Link></li>
                <li className="sidebar-item"><Link to="/filter"><FontAwesomeIcon icon={faSort} size="2x" style={{ color: "#0093ff" }} /></Link></li>
                <li className="sidebar-item"><Link to="/account"><FontAwesomeIcon icon={faUser} size="2x" style={{ color: "#0093ff" }} /></Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
