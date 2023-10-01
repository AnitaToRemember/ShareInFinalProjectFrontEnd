import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/RegisterPage.css";
import { registerUserService } from "../services/auth";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUserService({ userName, email, password: pass1 });

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="register-from">
      <h1>Create your account</h1>
      <form onSubmit={handleForm} >
        <fieldset>
          <label htmlFor="userName">User Name </label>
          <input
            type="userName"
            id="userName"
            name="userName"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
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

        <button>Register</button>
        {error ? <p>{error}</p> : null}
      </form>

      <div>
        <h3>
        Already have an account? <Link to="/">Log in</Link>
        </h3>
        <Link to="/home">Continue as a guest</Link>
      </div>
    </section>
  );
};

export default RegisterPage;
