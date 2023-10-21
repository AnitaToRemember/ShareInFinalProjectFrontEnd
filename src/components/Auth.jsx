import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/Auth.css";

// Functional component for handling user authentication status
const Auth = () => {
  // Destructuring user and logout function from the authentication context
  const { user, logout } = useContext(AuthContext);
  // JSX for rendering the component based on user authentication status
  return (
  <div className="auth-container">
      {user ? (
        // Displaying information for logged-in users
        <section className="logged-user">
          <p>Logged in as <Link to={`/user/${user.id}`}> {user.username} </Link>{" "}  </p>
          <button onClick={() => logout()}>Logout</button>
        </section>
      ) : (
      // Displaying options for not logged-in users
        <nav>
          <ul className="access-buttons">
            <li>
              <button>
                {/* Link to the registration page */}
                <Link to={"/register"} className="auth-buttons" >Register</Link>
              </button>
            </li>
            <li>
              <button>
                {/* Link to the login page */}
                <Link to={"/"} className="auth-buttons">Login</Link>
              </button>
            </li>
          </ul>
        </nav>
        )}
      </div>
    )
  };

export default Auth;
