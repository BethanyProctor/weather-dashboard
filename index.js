// //need: date, icon, temp, humidity, wind speed
const searchButton = document.querySelector('.search-btn');
const cityInput = document.querySelector(".city-input");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const geoAPIKey = `1a874bf16e155d8774b70ff5fb8c74e2`;
const APIKey = `2ce87c45b4c5de93bf67b3918c1caa4a`;

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) { //HTML for the current weather
        return `<div class="details">
                    <h2>${cityName} on ${weatherItem.dt_txt.split(" ")[0]}</h2>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    } else { //HTML for the forecast
    return `<li class="card">
                <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
    }
}

const getWeatherDetails = (cityName, lat, lon) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperical`;

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const uniqueForecastDays = []; //get only one forecast per day
        const fiveDayForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        //resets previous weather data
        cityInput.value ="";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        //creating the weather cards and adding them to the DOM
        console.log(fiveDayForecast);
        fiveDayForecast.forEach((weatherItem, index) => {
            if(index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index))
            } else {
            weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        })
    })
    .catch (() => {
        alert("An unexpected error has occurred fetching the weather forecast.")
     })
}


//function to get the lat and long of user input
const getCityCoords = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

     const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${geoAPIKey}`;

     fetch(geoURL)
     .then (res => res.json())
     .then(data => {
        console.log(data)
        if(!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0]; //deconstruct the data we need from the city info
        getWeatherDetails(name, lat, lon);
        
     })
     .catch (() => {
        alert("An unexpected error has occurred fetching the city coordinates.")
     })
}

const searchHistory = () => {
    const searchedCity = {
        city: cityInput.value.trim()
    };

    localStorage.setItem('searchedCity', json.stringify(searchedCity))
    console.log(localStorage);
}

const init = () => {
    JSON.parse(localStorage.getItem('searchedCity'));
}
init();


searchButton.addEventListener("click", getCityCoords);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoords());