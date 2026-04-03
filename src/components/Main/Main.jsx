import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnit from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";
function Main({
  weatherData,
  handleCardClick,
  defaultClothingItems,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnit);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {`Today is ${
            currentTemperatureUnit === "F"
              ? weatherData.temp.tempF
              : weatherData.temp.tempC
          }`}
          &deg;{`${currentTemperatureUnit} / You may want to wear:`}
        </p>
        <ul className="cards__list">
          {(Array.isArray(defaultClothingItems) ? defaultClothingItems : [])
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
