import { useContext, useRef, useState, useEffect } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/pages/AccountPage.css";
import Auth from '../components/Auth'
import { uploadAvatar } from "../services/user";


const AccountPage = () => {
  const { user, token } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const fileInputRef = useRef(null);

// useEffect para detectar cambios en 'user'
  useEffect(() => {
    // Aquí puedes actualizar el estado del avatar cuando 'user' cambie
    setAvatar((user && user.avatar) ? user.avatar : defaultAvatar);
  }, [user]); // [user] es la dependencia que se debe observar

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
      await uploadAvatar({ imageFile, token });
      setAvatar(URL.createObjectURL(imageFile));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditingAvatar(false);
    if (selectedAvatarFile) {
      uploadImage(selectedAvatarFile);
    }
  };
  

  return (
    <section className="account">
      <header>
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
                <button onClick={handleAvatarClick}> Select the file </button>
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
        {/* Otros detalles del perfil */}
      </div>
      <div className="account-actions">
        <h2>Account Actions</h2>
        <button className="change-password-button">
          <Link to="/change-password">Change Password</Link>
        </button>
        <button>Delete Account</button>
      </div>
    </section>
  );
};

export default AccountPage;