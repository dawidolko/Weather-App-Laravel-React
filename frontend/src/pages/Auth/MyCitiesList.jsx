import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Hero from "../../components/Hero/Hero";
import CityHistory from "./CityHistory";
import "./MyCitiesList.scss";

export default function MyCitiesList() {
  return (
    <AnimatedPage>
      <Hero title="My Cities List" cName="hero__img" />
      <CityHistory />
    </AnimatedPage>
  );
}
