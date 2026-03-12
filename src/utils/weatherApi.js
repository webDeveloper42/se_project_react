const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
`).then((res) => {
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
    type: getWeatherType(data.weather[0].main),
    temp: {
      tempF,
      tempC,
    },
    city: data.name,
    country: data.sys.country,
  };

  console.log(results);
  // console.log(data);
  // console.log(data.name);
  // console.log(data.sys.country);
  // console.log(data.main.temp);
  console.log(results.type);
  return results;
};
const getWeatherType = (condition) => {
  if (condition === "Clear") return "hot";
  if (condition === "Clouds" || condition === "Drizzle") return "warm";
  if (condition === "Rain" || condition === "Snow") return "cold";
  return "cold";
};
export { getWeather, filterWeatherData };
