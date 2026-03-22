import { Children, useEffect, useState } from "react";
import "../../vendor/normalize.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { apiKey, coordinates } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnit from "../../contexts/currentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem } from "../../utils/api.js";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: {
      tempF: 0,
      tempC: 0,
    },
    city: "",
    country: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
    console.log("clicked");
  };
  const handleCloseClick = () => {
    setActiveModal("");
  };
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);
  const handleToggleSwitchChange = (box) => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const handleAddItemSubmit = (item) => {
    console.log(`sending api`, item);
    addItem(item)
      .then((newItem) => {
        console.log(`sending api`, newItem);
        setClothingItems([newItem, ...clothingItems]);
        handleCloseClick();
      })
      .catch(console.error);
  };
  return (
    <div className="page">
      <CurrentTemperatureUnit.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  defaultClothingItems={defaultClothingItems}
                />
              }
            />
            <Route
              path="/Profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  defaultClothingItems={defaultClothingItems}
                  onAddItem={handleAddClick}
                  onCloseModal={handleCloseClick}
                />
              }
            />
          </Routes>
          <Footer />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={handleCloseClick}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={handleCloseClick}
            onAddItem={handleAddItemSubmit}
          />
        </div>
      </CurrentTemperatureUnit.Provider>
    </div>
  );
}

export default App;
