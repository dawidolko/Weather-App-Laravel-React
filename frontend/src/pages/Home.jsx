import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import MainBackground from "../components/MainBackground/MainBackground";
import Counter from "../components/Counter/Counter";
import Team from "../components/Team/Team";
import Testimonials from "../components/Testimonials/Testimonials";
import LogoSlider from "../components/LogoSlider/LogoSlider";
import ProductSearch from "../components/Product/ProductSearch";

const Home = () => {
  return (
    <AnimatedPage>
      <MainBackground />
      <section className="weather-section">
        <ProductSearch />
      </section>
      <Counter />
      <Team />
      <Testimonials />
      <LogoSlider />
    </AnimatedPage>
  );
};

export default Home;
