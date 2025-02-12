import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Hero from "../../components/Hero/Hero";
import "./Auth.scss";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrors({});
    setModalMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || {});
        setModalMessage(data.message || "Login failed!");
        setModalType("error");
        setTimeout(() => setModalMessage(""), 3000);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setModalMessage("Logged in successfully!");
      setModalType("success");
      setTimeout(() => {
        setModalMessage("");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setModalMessage("Login failed due to network error!");
      setModalType("error");
      setTimeout(() => setModalMessage(""), 3000);
    }
  }

  return (
    <AnimatedPage>
      <Hero title="Login" cName="hero__img" />
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Login to your account</h1>
          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="auth-input"
              required
            />
            {errors.email && <p className="auth-error">{errors.email[0]}</p>}
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="auth-input"
              required
            />
            {errors.password && (
              <p className="auth-error">{errors.password[0]}</p>
            )}
            <button className="auth-btn">Login</button>
          </form>
          <p className="auth-footer">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {modalMessage && (
        <div className={`modal ${modalType}`}>
          <p>{modalMessage}</p>
        </div>
      )}
    </AnimatedPage>
  );
}
