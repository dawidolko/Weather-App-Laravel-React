import PropTypes from "prop-types";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogItem = ({
  img = "/default-image.jpg",
  alt = "Blog Image",
  month = "January",
  title = "Default Blog Title",
  text = "This is a default blog description.",
  id = "1",
}) => {
  return (
    <div className="blog__box">
      <div className="blog__overflow">
        <img src={img} alt={alt} className="blog__img" />
      </div>
      <div className="blog__content">
        <div className="blog__icons">
          <span className="blog__span">
            <FaUser className="blog__icon" /> By WeatherApp Team
          </span>
          <span className="blog__span">
            <FaCalendarAlt className="blog__icon" /> {month} 2023
          </span>
        </div>
        <hr className="blog__line" />
        <h3 className="blog__title">{title}</h3>
        <p className="blog__text">{text}</p>
        <Link className="blog__link" to={`/blog/${id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BlogItem;
