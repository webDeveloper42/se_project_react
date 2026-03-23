import "./WeatherCard.css";
import sunny from "../../assets/sunnyBanner.png";
import CurrentTemperatureUnit from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnit);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {currentTemperatureUnit === "F"
          ? weatherData.temp.tempF
          : weatherData.temp.tempC}
        &deg;{currentTemperatureUnit}
      </p>
      <img src={sunny} alt="Sunny weather" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
