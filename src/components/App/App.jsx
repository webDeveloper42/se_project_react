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
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signUp, logIn, getCurrentUser } from "../../utils/auth.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleLoginSubmit = ({ email, password }) => {
    logIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getCurrentUser(data.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register-modal");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login-modal");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register-modal");
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleOpenDeleteModal = () => {
    setActiveModal("delete");
  };

  useEffect(() => {
    const loadWeather = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          setWeatherData(filterWeatherData(data));
        })
        .catch((err) => {
          console.error("Weather fetch failed", err);
          getWeather(coordinates, apiKey)
            .then((data) => setWeatherData(filterWeatherData(data)))
            .catch(console.error);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation failed, using default coordinates", error);
          loadWeather(coordinates);
        },
      );
    } else {
      loadWeather(coordinates);
    }

    getItems()
      .then((items) => {
        if (Array.isArray(items)) {
          setClothingItems(items);
        } else if (Array.isArray(items?.data)) {
          setClothingItems(items.data);
        } else {
          setClothingItems(defaultClothingItems);
        }
      })
      .catch((err) => {
        console.warn("getItems failed - using defaults", err);
        setClothingItems(defaultClothingItems);
      });

    const token = localStorage.getItem("jwt");
    if (!token) return;
    getCurrentUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        const normalized = {
          ...newItem,
          _id: newItem._id || newItem.id,
        };
        setClothingItems([normalized, ...clothingItems]);
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signUp({ name, avatar, email, password })
      .then(() => {
        return logIn({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getCurrentUser(data.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    if (!currentUser) return;

    const token = localStorage.getItem("jwt");
    if (!token) return;

    const action = isLiked ? removeCardLike : addCardLike;
    action(id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnit.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    defaultClothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={
                      <Profile
                        handleCardClick={handleCardClick}
                        defaultClothingItems={clothingItems}
                        onAddItem={handleAddClick}
                        onEditProfile={handleEditProfileClick}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                      />
                    }
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
            <RegisterModal
              isOpen={activeModal === "register-modal"}
              onCloseModal={handleCloseClick}
              onSignUp={handleRegister}
              onSwitchToLogin={handleSwitchToLogin}
            />
            <LoginModal
              isOpen={activeModal === "login-modal"}
              onCloseModal={handleCloseClick}
              onLogin={handleLoginSubmit}
              onSwitchToRegister={handleSwitchToRegister}
            />
            <DeleteModal
              handleCloseClick={handleCloseClick}
              onDelete={handleDeleteItem}
              isOpen={activeModal === "delete"}
            />
            <EditProfileModal
              onUpdateUser={handleUpdateUser}
              isOpen={activeModal === "edit-profile"}
              onCloseModal={handleCloseClick}
            />
          </div>
        </CurrentTemperatureUnit.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
