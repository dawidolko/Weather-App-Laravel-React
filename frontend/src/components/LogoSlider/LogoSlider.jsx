import "./LogoSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";

const LogoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    initialSlide: 0,
    autoplaySpeed: 4000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <Slider {...settings}>
          {[logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4].map(
            (logo, index) => (
              <div key={index} className="slider__box">
                <img src={logo} alt="Weather Service Logo" />
              </div>
            )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default LogoSlider;
