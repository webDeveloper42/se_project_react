import "./WeatherCard.css";
import sunny from "../../assets/sunnyBanner.png";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.tempF}&deg;F</p>
      <img src={sunny} alt="" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
