import { useContext, useState } from "react";
import { loginUserService } from "../services/index";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = await loginUserService({ email, password });
      login(token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h2>Hey, Welcome back...</h2>
      <h3>Don’t have an account? <a href="/register">Create an account.</a></h3>
      <form onSubmit={handleForm}>
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
          <h3>Forgotten password?</h3>
        </div>
        <button>Login</button>
        {error ? <p>{error}</p> : null}
      </form>

      <div>
        <h4>
          Don’t have an account? <a href="/register"> Sign Up</a>
        </h4>
      </div>
    </section>
  );
};

export default LoginPage;
