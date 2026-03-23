import { createContext } from "react";
const CurrentTemperatureUnit = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});
export default CurrentTemperatureUnit;
