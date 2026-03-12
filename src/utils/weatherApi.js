const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9);
  const results = {
    type: getWeatherType(tempF),
    temp: {
      tempF,
      tempC,
    },
    city: data.name,
    country: data.sys.country,
  };

  // console.log(results);
  // console.log(data);
  // console.log(data.name);
  // console.log(data.sys.country);
  // console.log(data.main.temp);
  console.log(data.weather[0].main);
  console.log(results.type);
  return results;
};
const getWeatherType = (temp) => {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
};
export { getWeather, filterWeatherData };
