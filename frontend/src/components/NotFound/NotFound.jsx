import "./NotFound.scss";
import { useEffect } from "react";
import { FaRegFaceFrown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="notFound">
      <FaRegFaceFrown className="notFound__icon" />
      <p className="notFound__error">404</p>
      <h2 className="notFound__title">Oops! Page Not Found</h2>
      <p className="notFound__text">
        Sorry, the page you are looking for doesn’t exist or may have been
        moved.
      </p>
      <p className="notFound__text">
        Let’s get you back on track! You will be automatically redirected to the
        homepage in a few seconds.
      </p>
      <button className="notFound__button" onClick={() => navigate("/")}>
        Return to Homepage
      </button>
    </section>
  );
};

export default NotFound;
