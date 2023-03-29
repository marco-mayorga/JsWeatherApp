import "./style.css";
import { toUnixTime, getForecast, getIp } from "./weatherAPI.js";

const tempScaleButton = document.querySelector("#temp-scale");
const form = document.querySelector("#search-form");

getIp();
tempScale();

// Prevents form from reloading

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Calls weather api and puts the responce into dom manipulation functions
    fetchWeather();
});

// Calls get functions with the value from search bar
async function fetchWeather() {
    const searchBar = document.querySelector("#search-bar");
    const location = searchBar.value;
    const weatherData = await getForecast(location);
    currentWeatherDom(weatherData);
    hourlyForecastDom(weatherData);
}
// Changes button text from F to C
function tempScale() {
    tempScaleButton.addEventListener("click", () => {
        if (tempScaleButton.textContent === "°F") {
            tempScaleButton.textContent = "°C";
        } else if (tempScaleButton.textContent === "°C") {
            tempScaleButton.textContent = "°F";
        }
    });
}
function currentWeatherDom(weatherData) {
    const currentLocationDiv = document.querySelector("#current-location");
    const currentConditionIconDiv = document.querySelector(
        "#current-condition-icon"
    );
    const currentConditionTextDiv = document.querySelector(
        "#current-condition-text"
    );
    const currentLocationTempDiv = document.querySelector(
        "#current-location-temp"
    );
    const currentHighDiv = document.querySelector("#current-high");
    const currentLowDiv = document.querySelector("#current-low");
    currentLocationDiv.textContent = weatherData.location.name;
    currentConditionIconDiv.src = `https:${weatherData.current.condition.icon}`;
    currentConditionTextDiv.textContent = weatherData.current.condition.text;
    currentLocationTempDiv.textContent = `${Math.round(
        weatherData.current.temp_f
    )}°`;
    currentHighDiv.textContent = `${Math.round(
        weatherData.forecast.forecastday["0"].day.maxtemp_f
    )}°`;
    currentLowDiv.textContent = `${Math.round(
        weatherData.forecast.forecastday["0"].day.mintemp_f
    )}°`;
}

function hourlyForecastDom(weatherData) {
    const hours = weatherData.forecast.forecastday["0"].hour;
    const cards = document.querySelector(".hourly-forecast-cards").children;
    const cardsArray = Array.from(cards);
    cardsArray.forEach((card, index) => {
        let time = toUnixTime(hours[index].time);
        card.innerHTML = `
        <div class="hour">${time}</div>
        <img src="${hours[index].condition.icon}" alt="" />
        <div class="hourly-temp">${Math.round(hours[index].temp_f)}°</div>`;
    });
}
