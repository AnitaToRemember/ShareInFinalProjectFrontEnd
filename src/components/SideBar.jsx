// Sidebar component
import '../styles/components/SideBar.css';
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
                <li className="sidebar-item"><Link to={homeLink}><FontAwesomeIcon icon={faHouse}  /></Link></li>
                <li className="sidebar-item"><Link to="/mylinks"><FontAwesomeIcon icon={faLink} /></Link></li>
                <li className="sidebar-item"><Link to="/filter"><FontAwesomeIcon icon={faSort}  /></Link></li>
                <li className="sidebar-item"><Link to="/account"><FontAwesomeIcon icon={faUser}  /></Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
