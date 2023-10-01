import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { loginUserService } from '../services/auth';

// LoginPage component provides a form for users to log in.
// Users can enter their email and password to log in, or they can navigate to the registration page.
// If the login is successful, the user is redirected to the home page.
const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleForm = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Attempt to log in the user and get a token.
            const token = await loginUserService({ email, password });
            // Set the user as authenticated and navigate to the home page.
            login(token);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="login-form">
            <h2>Hey, Welcome back...</h2>
            <h3>
                Don’t have an account?{' '}
                <Link to="/register">Create an account.</Link>
            </h3>
            <form onSubmit={handleForm} className="login-form">
                <fieldset>
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <div>
                    <div>
                        <Link to="/password-recovery">Forgotten password?</Link>
                    </div>
                </div>
                <button>Login</button>
                {error ? <p>{error}</p> : null}
            </form>

            <div>
                <h4>
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                </h4>
                <Link to="/home">Continue as a guest</Link>
            </div>
        </section>
    );
};

export default LoginPage;
