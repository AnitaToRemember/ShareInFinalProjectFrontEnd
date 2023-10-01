import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/pages/RegisterPage.css";
import { Link } from "react-router-dom";
import { changePasswordService } from "../services/auth";

const ChangePasswordPage = () => {
  const { token } = useContext(AuthContext);
  const [oldPass, setOldPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setMessage("");

    if (pass1 !== pass2) {
      setMessage("Passwords don’t match");
      return;
    }

    try {
      await changePasswordService({ oldPassword: oldPass, newPassword: pass1, token });
      setMessage("Password changed successfully");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1>Change your password here</h1>
      <form onSubmit={handleForm}>
      <fieldset>
          <label htmlFor="oldPass">Old Password </label>
          <input
            type="password"
            id="oldPass"
            name="oldPass"
            required
            onChange={(e) => setOldPass(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="pass1">Password </label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="pass2">Repeat Password </label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          />
        </fieldset>

        <button>Save</button>
        {message ? <p>{message}</p> : null}
      </form>
      <button >
          <Link to="/account">Cancel</Link>
        </button>
    </section>
  );
};

export default ChangePasswordPage;