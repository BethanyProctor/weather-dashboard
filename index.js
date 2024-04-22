//need: date, icon, temp, humidity, wind speed

const cityEl = document.getElementById('current-city');
const currentDateEl = document.getElementById('currentDate');
const currentWeatherEl = document.getElementById('currentWeather');
const forecastEl = document.getElementById('fiveDayWeather');
const currentTempEl = document.getElementById('current-temp');
const currentWindEl = document.getElementById('current-windspeed');
const currentHumidityEl = document.getElementById('current-humidity');


const APIKey = `2ce87c45b4c5de93bf67b3918c1caa4a`;
let latitude;
let longitude;
const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperical`;

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let (latitude, longitude) = success.coords;
        fetch(queryURL)

        .then (res => res.json().then (data =>{
            console.log(data);
            showWeatherData(data);
        }))
    })
}

getWeatherData();

function showWeatherData(data) {
    let (humidity, )
}