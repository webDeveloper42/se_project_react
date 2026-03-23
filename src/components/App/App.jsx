import { useEffect, useState } from "react";
import "../../vendor/normalize.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { apiKey, coordinates } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnit from "../../contexts/currentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCloseClick = () => {
    setActiveModal("");
  };
  const handleOpenDeleteModal = () => {
    setActiveModal("delete");
  };
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        const normalized = {
          ...newItem,
          _id: newItem._id || newItem.id || item._id || item.id,
        };

        setClothingItems([normalized, ...clothingItems]);
        handleCloseClick();
      })
      .catch(console.error);
  };
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
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
                  defaultClothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  defaultClothingItems={clothingItems}
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
            handleOpenDeleteModal={handleOpenDeleteModal}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={handleCloseClick}
            onAddItem={handleAddItemSubmit}
          />
          <DeleteModal
            handleCloseClick={handleCloseClick}
            onDelete={handleDeleteItem}
            isOpen={activeModal === "delete"}
          />
        </div>
      </CurrentTemperatureUnit.Provider>
    </div>
  );
}

export default App;
