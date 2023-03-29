export async function getForecast(location) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f304e88a2240431a9f490852223001&q=${location}&days=3&aqi=no&alerts=no`,
        { mode: "cors" }
    );
    const weatherData = await response.json();
    return weatherData;
}
