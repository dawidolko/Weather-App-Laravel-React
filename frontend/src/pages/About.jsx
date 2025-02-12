import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import Hero from "../components/Hero/Hero";
import AboutUs from "../components/AboutUs/AboutUs";
import Testimonials from "../components/Testimonials/Testimonials";
import Team from "../components/Team/Team";
import Message from "../components/Message/Message";

const About = () => {
  return (
    <AnimatedPage>
      <Hero title="ABOUT" cName="hero__img" />
      <AboutUs />
      <Testimonials />
      <Team />
      <Message />
    </AnimatedPage>
  );
};

export default About;
