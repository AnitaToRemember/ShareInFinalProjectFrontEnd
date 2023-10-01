import { useState } from "react";
import "../styles/pages/PasswordRecoveryPage.css";
import { RecoveryByEmailService, SendEmailToRecoverPassword } from "../services/passwordRecovery";


function PasswordRecoveryPage() {
  // State para almacenar el correo electrónico, código de confirmación, mensaje de éxito/error, etc.
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState("");
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  // Manejar cambios en el correo electrónico
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Manejar cambios en el código de confirmación
  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  // Enviar el correo electrónico y mostrar el formulario de confirmación
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (email) {
      // Mostrar el formulario de confirmación y enviar un mensaje
      try {
        await SendEmailToRecoverPassword({ email });
        setMessage(
          `A recovery mail has been sent to ${email}, please check your inbox.`
        );
        setShowConfirmationForm(true);
      } catch (error) {
        setMessage(error.message);
      }
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  // Manejar el envío del formulario de restablecimiento de contraseña
  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!confirmationCode) { 
      setMessage("Please enter a valid confirmation code.");
      return;
    }
    if (pass1 !== pass2) {
      setError("Passwords don’t match");
      return;
    }

    try {
      // Aqui debo agregar la lógica para actualizar la contraseña en el servidor
      await RecoveryByEmailService({ email, code: confirmationCode, password: pass1 });
      setMessage("Password reset successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="password-recovery-page">
      <h1>Reset your password</h1>
      {showConfirmationForm ? (
        <div>
          {/* Formulario de confirmación de código */}
          <form>
            <label>
              Enter the confirmation code sent to your email:
              <input
                type="text"
                value={confirmationCode}
                onChange={handleConfirmationCodeChange}
                placeholder="Confirmation Code"
                required
              />
            </label>
            <button className="less-prominent-button" onClick={handleSubmitEmail}>
              I didn’t receive the code, please resend it
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Formulario para enviar el correo electrónico */}
          <form onSubmit={handleSubmitEmail}>
            <label>
              <p>
                Enter the email linked to your ShareIn account. You’ll receive a
                code to reset your password.
              </p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                required
              />
            </label>
            <button type="submit">Send Recovery Mail</button>
          </form>
        </div>
      )}

      {showConfirmationForm ? (
        <section>
          {/* Formulario de restablecimiento de contraseña */}
          <form onSubmit={handleForm}>
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

            <button>
              Save
            </button>
            {error ? <p>{error}</p> : null}
          </form>
        </section>
      ) : null}
      <p>{message}</p>
    </div>
  );
}

export default PasswordRecoveryPage;