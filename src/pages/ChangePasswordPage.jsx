import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { changePasswordService } from '../services/auth';
import '../styles/pages/RegisterPage.css';
import Auth from '../components/Auth';

// Define the ChangePasswordPage component
const ChangePasswordPage = () => {
    // Access the authentication token from the AuthContext
    const { token } = useContext(AuthContext);

    // State variables to manage user input and messages
    const [oldPass, setOldPass] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleForm = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setMessage(''); // Clear any previous messages

        // Check if the new passwords match
        if (pass1 !== pass2) {
            setMessage('Passwords don’t match');
            return; // Exit the function if passwords don't match
        }

        try {
            // Attempt to change the password using the changePasswordService function
            await changePasswordService({
                oldPassword: oldPass,
                newPassword: pass1,
                token,
            });
            setMessage('Password changed successfully'); // Set a success message
        } catch (error) {
            setMessage(error.message); // Set an error message if an error occurs
        }
    };

    // Render the ChangePasswordPage component
    return (
        <section className="password-recovery-page">
            {/* Header section with authentication component */}
            <header>
                <Auth />
            </header>

            <h1>Change your password here</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label className='change-password-label'>Old Password </label>
                    <input
                        className='recovery-input'
                        type="password"
                        id="oldPass"
                        name="oldPass"
                        required
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder='Enter your password here '
                    />
                </fieldset>

                <fieldset>
                    <label className='change-password-label'>New password </label>
                    <input
                        className='recovery-input'
                        type="password"
                        id="pass1"
                        name="pass1"
                        required
                        onChange={(e) => setPass1(e.target.value)}
                        placeholder='Please enter your new password here'
                    />
                </fieldset>

                <fieldset>
                    <label className='change-password-label'>Repeat new password </label>
                    <input
                        className='recovery-input'
                        type="password"
                        id="pass2"
                        name="pass2"
                        required
                        onChange={(e) => setPass2(e.target.value)}
                        placeholder='Please repeat your new password here'
                    />
                </fieldset>

                <button>Save</button>
                {message ? <p>{message}</p> : null}
            </form>
            <button>
                <Link to="/account">Cancel</Link>
            </button>
        </section>
    );
};

export default ChangePasswordPage;
