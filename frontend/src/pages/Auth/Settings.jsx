import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Hero from "../../components/Hero/Hero";
import "./Auth.scss";

export default function Settings() {
  const { user, token, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});
    setModalMessage("");

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.status !== 200) {
      setErrors(data.errors || { general: "Update failed" });
      setModalMessage("Update failed!");
      setModalType("error");
      setTimeout(() => setModalMessage(""), 3000);
    } else {
      setUser((prevUser) => ({ ...prevUser, name: data.user.name }));
      setSuccessMessage("Settings updated successfully!");
      setModalMessage("Settings updated successfully!");
      setModalType("success");
      setFormData({ ...formData, password: "", password_confirmation: "" });
      setTimeout(() => setModalMessage(""), 2000);
    }
  }

  return (
    <AnimatedPage>
      <Hero title="Account Settings" cName="hero__img" />
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Update Your Profile</h1>
          {successMessage && <p className="auth-success">{successMessage}</p>}
          <form onSubmit={handleUpdate} className="auth-form">
            <input
              type="text"
              placeholder="New Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="auth-input"
              required
            />
            {errors.name && <p className="auth-error">{errors.name[0]}</p>}
            <input
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="auth-input"
            />
            {errors.password && (
              <p className="auth-error">{errors.password[0]}</p>
            )}
            <input
              type="password"
              placeholder="Confirm New Password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              className="auth-input"
            />
            <button className="auth-btn">Save Changes</button>
            {errors.general && <p className="auth-error">{errors.general}</p>}
          </form>
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
