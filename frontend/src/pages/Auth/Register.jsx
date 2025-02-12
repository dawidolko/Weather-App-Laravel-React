import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Hero from "../../components/Hero/Hero";
import "./Auth.scss";

export default function Register() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setErrors({});
    setModalMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || {});
        setModalMessage(data.message || "Registration failed!");
        setModalType("error");
        setTimeout(() => setModalMessage(""), 3000);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setModalMessage("Registered successfully!");
      setModalType("success");
      setTimeout(() => {
        setModalMessage("");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setModalMessage("Registration failed due to network error!");
      setModalType("error");
      setTimeout(() => setModalMessage(""), 3000);
    }
  }

  return (
    <AnimatedPage>
      <Hero title="Register" cName="hero__img" />
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Create an account</h1>
          <form onSubmit={handleRegister} className="auth-form">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="auth-input"
              required
            />
            {errors.name && <p className="auth-error">{errors.name[0]}</p>}
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              className="auth-input"
              required
            />
            <button className="auth-btn">Register</button>
          </form>
          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
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
