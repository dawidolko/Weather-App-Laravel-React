import PropTypes from "prop-types";
import "./AboutContent.scss";
import { GiCheckMark } from "react-icons/gi";

const AboutContent = ({
  img,
  alt = "About section image",
  title,
  span = "",
  text,
  showIcons = true,
}) => {
  return (
    <section className="about container">
      <div className="about__container container">
        <div className="about__img-container">
          <img className="about__img" src={img} alt={alt} />
        </div>
        <div className="about__content">
          <h2 className="about__title">
            {title}
            <span className="about__span"> {span} </span>
          </h2>
          <p className="about__text">{text}</p>
          {showIcons && (
            <>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Get Real-Time Weather Updates for Your City
              </p>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Our Mission: Deliver Accurate and Reliable Forecasts
              </p>
              <p className="about__marks">
                <GiCheckMark className="about__mark" />
                Join a Community of Weather Enthusiasts and Stay Informed
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

AboutContent.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string.isRequired,
  span: PropTypes.string,
  text: PropTypes.string.isRequired,
  showIcons: PropTypes.bool,
};

export default AboutContent;
