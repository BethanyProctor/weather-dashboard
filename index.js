//need: date, icon, temp, humidity, wind speed
const userCityEl = document.getElementById('userCity');
const submitBtnEl = document.querySelector('.submit-btn')
const recentList = document.querySelector('.recentCities')

const cityEl = document.getElementById('current-city');
const currentDateEl = document.getElementById('currentDate');
const currentWeatherEl = document.getElementById('currentWeather');
const forecastEl = document.getElementById('fiveDayWeather');
const currentTempEl = document.getElementById('current-temp');
const currentWindEl = document.getElementById('current-windspeed');
const currentHumidityEl = document.getElementById('current-humidity');

const searchHistory = [];

//API info
let latitude;
let longitude;
const geoAPIKey = `1a874bf16e155d8774b70ff5fb8c74e2`;
const APIKey = `2ce87c45b4c5de93bf67b3918c1caa4a`;

const getCityCoords = () => {
    const cityName = userCityEl.value;
    if (!cityName) alert ('Enter a City to get Started');

    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${geoAPIKey}`;

    fetch(geoURL)
    .then (res => res.json())
    .then(data => {
        searchHistory.push(cityName);
        localStorage.setItem('history', json.stringify(searchHistory))
        console.log('searchHistory', searchHistory)

        let latitude = data.lat;
        let longitude = data.lon;

        console.log(`Lat: ${latitude}`);
        console.log(`Long: ${longitude}`);
    })
    .catch (() => console.error());

 } 

const getWeatherData = () => {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperical`;
    
    getCityCoords();
    
    fetch(queryURL)
        .then (res => res.json())
        .then (data => {
            console.log(data);
        })
        .catch (console.error());

    recentList.innerHTML = 
       `<p>${searchHistory[0]}</p>
        <p>${searchHistory[1]}</p>
        <p>${searchHistory[2]}</p>
        <p>${searchHistory[3]}</p>
        <p>${searchHistory[4]}</p>`;
}

submitBtnEl.addEventListener('click', event => {
    event.preventDefault();
    getWeatherData();
 })
