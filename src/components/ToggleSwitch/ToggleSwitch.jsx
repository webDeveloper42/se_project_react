import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnit from "../../contexts/currentTemperatureUnitContext";
function ToggleSwitch() {
  const checkboxes = ["F", "C"];
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnit,
  );
  function createCheckBox(text) {
    return (
      <label
        key={text}
        className={`toggle-label ${currentTemperatureUnit === text ? "toggle-active" : ""}`}
        htmlFor={`temp-${text}`}
      >
        {text}
        <input
          checked={currentTemperatureUnit === text}
          onChange={() => handleToggleSwitchChange(text)}
          type="checkbox"
          name={`${text.toUpperCase()}`}
          id={`temp-${text}`}
          className="toggle-btn"
        />
      </label>
    );
  }
  return (
    <div className="toggle-container">
      <div
        className={`toggle-slider ${currentTemperatureUnit === "C" ? "slider-right" : ""}`}
      ></div>
      {checkboxes.map((box) => {
        return createCheckBox(box);
      })}
    </div>
  );
}

export default ToggleSwitch;
