import PropTypes from "prop-types";

const TestimonialsItem = ({
  img,
  alt = "Testimonial Image",
  name = "User",
  review = "No review available",
}) => {
  return (
    <div className="testimonials__box">
      <div className="testimonials__person">
        <img src={img} alt={alt} className="testimonials__img" />
        <div className="testimonials__info">
          <p className="testimonials__name">{name}</p>
          <p className="testimonials__client">Our Client</p>
        </div>
      </div>
      <p className="testimonials__review">{review}</p>
    </div>
  );
};

TestimonialsItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  name: PropTypes.string,
  review: PropTypes.string,
};

export default TestimonialsItem;
