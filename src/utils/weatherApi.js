import { checkRes } from "./api.js";
const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(checkRes);
};
const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9);
  const results = {
    type: getWeatherType(tempF),
    temp: {
      tempF: tempF,
      tempC: tempC,
    },
    city: data.name,
    country: data.sys.country,
  };
  return results;
};
const getWeatherType = (temp) => {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
};
export { getWeather, filterWeatherData };
