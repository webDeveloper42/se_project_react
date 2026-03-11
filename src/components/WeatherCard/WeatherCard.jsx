import "./WeatherCard.css";
import weatherBanner1 from "../../assets/sunnyBanner.png";
function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> 75 &deg; F</p>
      <img src={weatherBanner1} alt="" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
