import "./Counter.scss";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="counter">
      {inView && (
        <div className="counter__box">
          <CountUp end={50000} duration={3} className="counter__number" />
          <p className="counter__text">Weather Reports Generated</p>
        </div>
      )}
      {inView && (
        <div className="counter__box">
          <CountUp end={10000} duration={4} className="counter__number" />
          <p className="counter__text">Cities Tracked</p>
        </div>
      )}
      {inView && (
        <div className="counter__box">
          <CountUp end={500} duration={4} className="counter__number" />
          <p className="counter__text">Extreme Weather Alerts Issued</p>
        </div>
      )}
      {inView && (
        <div className="counter__box">
          <CountUp end={20} duration={4} className="counter__number" />
          <p className="counter__text">Years of Reliable Forecasts</p>
        </div>
      )}
    </section>
  );
};

export default Counter;
