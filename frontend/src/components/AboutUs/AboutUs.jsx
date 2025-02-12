import AboutContent from "../AboutContent/AboutContent";
import about from "../../assets/about.webp";

const AboutUs = () => {
  return (
    <>
      <AboutContent
        img={about}
        alt="A weather forecast interface displaying real-time updates and climate insights."
        title="Stay Informed"
        span="With Accurate Weather Forecasts"
        text="At WeatherApp, we are dedicated to providing real-time and reliable weather updates. Our mission is to keep you informed about changing weather conditions, ensuring you are always prepared. With a focus on accuracy and accessibility, we deliver forecasts that help you plan your day effectively. Join us and stay ahead of the weather with trusted data and insights."
      />
    </>
  );
};

export default AboutUs;
