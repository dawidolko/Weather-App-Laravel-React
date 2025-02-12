import "./Navbar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBgc, setNavBgc] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        logout();
        setModalMessage("Logged out successfully!");
        setModalType("success");
        setTimeout(() => {
          setModalMessage("");
          navigate("/");
        }, 2000);
      } else {
        setModalMessage("Logout failed!");
        setModalType("error");
        setTimeout(() => setModalMessage(""), 2000);
      }
    } catch (error) {
      setModalMessage("Logout failed!");
      setModalType("error");
      setTimeout(() => setModalMessage(""), 2000);
    }
  }

  useEffect(() => {
    const changeBgc = () => {
      setNavBgc(window.scrollY > 10);
    };
    window.addEventListener("scroll", changeBgc);
    return () => {
      window.removeEventListener("scroll", changeBgc);
    };
  }, []);

  return (
    <>
      <nav className={navBgc ? "navbar navbar__bgc" : "navbar"}>
        <div className="navbar__container container">
          <Link to="/" className="navbar__logo">
            <p className="navbar__logo-text">WeatherApp</p>
          </Link>

          <ul
            className={
              isOpen ? "navbar__links navbar__links-active" : "navbar__links"
            }>
            <li>
              <NavLink className="navbar__link" to="/" onClick={closeNav}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar__link" to="/about" onClick={closeNav}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar__link" to="/faq" onClick={closeNav}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar__link" to="/blog" onClick={closeNav}>
                BLOG
              </NavLink>
            </li>
            {/* Sekcja użytkownika */}
            <li className="navbar__auth">
              {user ? (
                <div
                  className="navbar__user"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={toggleDropdown}>
                  <FaUser className="navbar__user-icon" />
                  <span className="navbar__welcome">Welcome, {user.name}!</span>
                  {dropdownOpen && (
                    <div className="navbar__dropdown">
                      <NavLink
                        to="/my-cities"
                        className="navbar__dropdown-item"
                        onClick={closeNav}>
                        My Cities List
                      </NavLink>
                      <div>
                        <NavLink
                          className="navbar__dropdown-item"
                          to="/settings"
                          onClick={closeNav}>
                          Account Settings
                        </NavLink>
                      </div>
                      <button
                        className="navbar__dropdown-item logout"
                        onClick={handleLogout}>
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink className="navbar__user-icon-link" to="/login">
                  <FaUser className="navbar__user-icon" />
                </NavLink>
              )}
            </li>
          </ul>

          <div className="navbar__hamburger" onClick={handleClick}>
            {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
      {modalMessage && (
        <div className={`modal ${modalType}`}>
          <p>{modalMessage}</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
