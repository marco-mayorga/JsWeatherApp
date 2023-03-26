export async function getCurrentWeather(location) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f304e88a2240431a9f490852223001&q=${location}`,
        { mode: "cors" }
    );
    const weatherData = await response.json();
    return console.log(weatherData);
}

export async function getForecast(location) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f304e88a2240431a9f490852223001&q=${location}&days=7&aqi=no&alerts=no`,
        { mode: "cors" }
    );
    const forecastData = await response.json();
    return console.log(forecastData);
}

export function setCurrentWeather(weatherData) {}
export function setForecast(weatherData) {}

/* 
To-do:

[] Implement search / Auto Complete

[] Implement Ip search

*/
