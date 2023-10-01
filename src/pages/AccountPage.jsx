import { useContext, useRef, useState, useEffect } from 'react';
import defaultAvatar from '../assets/default-avatar.png';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/pages/AccountPage.css';
import Auth from '../components/Auth';
import { uploadAvatar } from '../services/user';

// AccountPage component represents the user's account page.
// It displays profile information, including the user's avatar, username, and email.
// Users can also edit their avatar and perform account actions.
const AccountPage = () => {
    const { user, token } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(null);
    const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Set the avatar to the user's avatar or the default avatar if it's not available.
        setAvatar(user && user.avatar ? user.avatar : defaultAvatar);
    }, [user]);

    const showEditAvatar = () => {
        setIsEditingAvatar(true);
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleAvatarChange = (e) => {
        setSelectedAvatarFile(e.target.files[0]);
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const uploadImage = async (imageFile) => {
        try {
            // Upload the user's selected avatar image.
            await uploadAvatar({ imageFile, token });
            // Set the avatar to the uploaded image.
            setAvatar(URL.createObjectURL(imageFile));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditingAvatar(false);
        if (selectedAvatarFile) {
            // If a new avatar file is selected, upload it.
            uploadImage(selectedAvatarFile);
        }
    };

    return (
        <section className="account">
            <header>
                {/* Display authentication status */}
                <Auth />
            </header>

            <h1>Your Account</h1>
            <div className="account-details">
                <h2>Profile Information</h2>
                <div className="avatar-container">
                    <img
                        key={avatar}
                        src={avatar}
                        alt="Profile Avatar"
                        className="avatar"
                        onClick={showEditAvatar}
                    />
                    {isEditingAvatar && (
                        <div className="avatar-edit">
                            <input
                                type="file"
                                id="fileInput"
                                className="custom-file-input"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                ref={fileInputRef}
                            />
                            <label htmlFor="fileInput">
                                <button onClick={handleAvatarClick}>
                                    {' '}
                                    Select the file{' '}
                                </button>
                            </label>
                            <button
                                type="submit"
                                className="save-button"
                                onClick={handleSubmit}
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
                <p>
                    <strong>Username:</strong> {user ? user.username : 'N/A'}
                </p>
                <p>
                    <strong>Email:</strong> {user ? user.email : 'N/A'}
                </p>
                {/* Display other profile details here */}
            </div>
            <div className="account-actions">
                <h2>Account Actions</h2>
                <button className="change-password-button">
                    {/* Link to the change password page */}
                    <Link to="/change-password">Change Password</Link>
                </button>
            </div>
        </section>
    );
};

export default AccountPage;
