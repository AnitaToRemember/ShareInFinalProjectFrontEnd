// Importing CSS and necessary components and hooks
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyLinks from "./pages/MyLinks";
import HeaderBar from "./components/HeaderBar";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import LinkPage from "./pages/LinkPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import FilterPage from "./pages/FilterPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SwitchMode from './components/SwitchMode';
import SideBar from "./components/SideBar";
import AboutUsPage from "./pages/AboutUsPage";
import NotFoundPage from "./pages/notFoundPage";


// Functional component for the main App
function App() {
  // Destructuring the user from AuthContext
  const { user } = useContext(AuthContext);

  // JSX for rendering the main App
  return (
    <main>
      {/* HeaderBar component for the top bar */}
      <HeaderBar />
      {/* SwitchMode component for dark mode toggle */}
      <SwitchMode />
      {/* React Router Routes for different pages */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mylinks" element={<MyLinks />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/links/:id" element={<LinkPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* Conditional rendering of NavigationBar if user is authenticated */}
      {user ? <NavigationBar /> : null}
      {user ? <SideBar /> : null}

    </main>
  );
}

// Exporting the App component as the default export
export default App;
