import PropTypes from "prop-types";
import "./Hero.scss";

const Hero = ({ cName = "hero__default", title = "Default Title" }) => {
  return (
    <section className="hero">
      <div className={cName}>
        <h2 className="hero__title">{title}</h2>
      </div>
    </section>
  );
};

Hero.propTypes = {
  cName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Hero;
