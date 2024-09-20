import React, { useState } from "react";
import { useEffect } from "react";
const App = () => {
  const [city, setcity] = useState("delhi");
  const [weatherdata, setweatherdata] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const FormattedDate = `${month} ${day},${year}`;

  const API_KEY = "ad298896b3d116fde16fffc63bc97c85";
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log(data);
      setweatherdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setcity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "./images/mist.png"; // Path to your sunny weather icon
      case "Rain":
        return "./images/rain.png"; // Path to your rainy weather icon
      case "Clouds":
        return "./images/clouds.png"; // Path to your snowy weather icon
      case "Haze":
        return "./images/drizzle.png"; // Path to your haze weather icon
      // Add more cases for other weather conditions as needed
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherdata && (
          <>
            <h1 className="container-date">{FormattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherdata.name}</h2>
              {/* <img
                className="container_img"
                src={ getWeatherIconUrl(weatherData.weather[0].main) }
                width="180px"
              /> */}
              <img className="container_img" src={getWeatherIconUrl(weatherdata.weather[0].main)} width="180px" alt="Weather Icon" />
              <h2 className="container_degree">{weatherdata.main.temp}</h2>
              <h2 className="country_per">{weatherdata.weather[0].main}</h2>
              <form action="" className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  name=""
                  id=""
                  onChange={handleInputChange}
                />
                <button type="submit" onClick={handleSubmit}>
                  Get
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
