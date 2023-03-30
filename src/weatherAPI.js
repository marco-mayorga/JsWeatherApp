export function toUnixTime(unixTime) {
    let formattedTime = new Date(unixTime);
    formattedTime.toLocaleTimeString("default");
    return formattedTime.toLocaleTimeString("default");
}

export async function getForecast(location) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f304e88a2240431a9f490852223001&q=${location}&days=3&aqi=no&alerts=no`,
        { mode: "cors" }
    );
    const weatherData = await response.json();
    return weatherData;
}

export async function getIp() {
    const Ip = await fetch("https://api.ipify.org?format=json", {
        mode: "cors",
    });
    const IpAddress = await Ip.json();
    return getIpWeather(IpAddress.ip);
}

async function getIpWeather(Ip) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f304e88a2240431a9f490852223001&q=${Ip}`,
        {
            mode: "cors",
        }
    );
    const weatherData = await response.json();
    return parseIpWeather(weatherData);
}

function parseIpWeather(weatherData) {
    const tempScaleButton = document.querySelector("#temp-scale");
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

    const hours = weatherData.forecast.forecastday["0"].hour;

    if (tempScaleButton.textContent === "°F") {
        currentLocationTempDiv.textContent = `${Math.round(
            weatherData.current.temp_f
        )}°`;
        currentHighDiv.textContent = `${Math.round(
            weatherData.forecast.forecastday["0"].day.maxtemp_f
        )}°`;
        currentLowDiv.textContent = `${Math.round(
            weatherData.forecast.forecastday["0"].day.mintemp_f
        )}°`;

        const cards = document.querySelector(".hourly-forecast-cards").children;
        const cardsArray = Array.from(cards);
        cardsArray.forEach((card, index) => {
            let time = toUnixTime(hours[index].time);
            card.innerHTML = `
            <div class="hour">${time}</div>
            <img src="${hours[index].condition.icon}" alt="" />
            <div class="hourly-temp">${Math.round(hours[index].temp_f)}°</div>`;
        });
    } else if (tempScaleButton.textContent === "°C") {
        currentLocationTempDiv.textContent = `${Math.round(
            weatherData.current.temp_c
        )}°`;
        currentHighDiv.textContent = `${Math.round(
            weatherData.forecast.forecastday["0"].day.maxtemp_c
        )}°`;
        currentLowDiv.textContent = `${Math.round(
            weatherData.forecast.forecastday["0"].day.mintemp_c
        )}°`;

        const cards = document.querySelector(".hourly-forecast-cards").children;
        const cardsArray = Array.from(cards);
        cardsArray.forEach((card, index) => {
            let time = toUnixTime(hours[index].time);
            card.innerHTML = `
            <div class="hour">${time}</div>
            <img src="${hours[index].condition.icon}" alt="" />
            <div class="hourly-temp">${Math.round(hours[index].temp_c)}°</div>`;
        });
    }
}
