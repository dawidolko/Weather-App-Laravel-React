import "./Map.scss";

const Map = () => {
  return (
    <div className="map">
      <iframe
        className="map__frame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.1106784170223!2d22.004921677191832!3d50.04184717156544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfbd41584e69d%3A0x901e6876f87502c3!2sIdeo%20Sp.%20z%20o.o.!5e0!3m2!1spl!2spl!4v1706623504010!5m2!1spl!2spl"
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="WeatherApp Headquarters - Ideo Software, Rzeszów"></iframe>
    </div>
  );
};

export default Map;
