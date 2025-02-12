import "./Footer.scss";
import { Link } from "react-router-dom";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLocationArrow,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <div className="footer__box">
            <Link to="/" className="footer__logo">
              <p className="footer__logo-text">WeatherApp</p>
            </Link>
            <div className="footer__desc">
              Stay informed with real-time weather updates and accurate
              forecasts. Track your favorite cities and be prepared for any
              weather condition.
            </div>
          </div>
          <div className="footer__box">
            <h3 className="footer__title">Useful Links</h3>
            <ul className="footer__links">
              <li>
                <Link to="/about" className="footer__link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer__link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="footer__link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__box">
            <h3 className="footer__title">Live Weather Updates</h3>
            <p>Weather data updates every 30 minutes.</p>
            <p>Track up to 10 cities in real time.</p>
            <p>Severe weather alerts available.</p>
          </div>
          <div className="footer__box">
            <h3 className="footer__title">Contact</h3>
            <div className="footer__contact">
              <FaLocationArrow className="footer__icon" />
              <a
                className="footer__link"
                href="https://maps.app.goo.gl/jKPN2oKWiUrcJuuD9"
                target="_blank"
                rel="noreferrer">
                WeatherApp HQ, New York, USA
              </a>
            </div>
            <div className="footer__contact">
              <AiFillMail className="footer__icon" />
              <a className="footer__link" href="mailto:support@weatherapp.com">
                support@weatherapp.com
              </a>
            </div>
            <div className="footer__contact">
              <AiFillPhone className="footer__icon" />
              <a className="footer__link" href="tel:+1234567890">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
        <hr className="footer__line" />
        <div className="footer__date">
          <p>
            &copy; Copyright {new Date().getFullYear()}
            <span className="footer__logo-name"> WeatherApp </span>
            All Rights Reserved.
          </p>
          <div className="footer__icons">
            <div className="footer__icon-bg">
              <FaFacebookF className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaTwitter className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaInstagram className="footer__icon" />
            </div>
            <div className="footer__icon-bg">
              <FaYoutube className="footer__icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
