const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const status = document.getElementById("status");

const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const weatherCode = document.getElementById("weatherCode");

const retryButton = document.getElementById("retryButton");



let controller = null;

let lastCity = "";




async function fetchWeather(city) {

    // Cancel previous request
    if (controller) {
        controller.abort();
    }

    // Create controller for new request
    controller = new AbortController();

    const signal = controller.signal;

    try {

        setLoadingState();

       

        const geocodingUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const locationResponse = await fetch(
            geocodingUrl,
            { signal }
        );

        if (!locationResponse.ok) {
            throw new Error("Failed to find city");
        }

        const locationData = await locationResponse.json();

        if (
            !locationData.results ||
            locationData.results.length === 0
        ) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(
            weatherUrl,
            { signal }
        );

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather");
        }

        const weatherData = await weatherResponse.json();


        

        showWeather(location, weatherData);

    } catch (error) {

        
        if (error.name === "AbortError") {
            return;
        }

        showError(error.message);
    }
}




function setLoadingState() {

    status.textContent = "Loading weather...";

    weatherResult.classList.add("hidden");

    retryButton.classList.add("hidden");
}




function showWeather(location, weatherData) {

    status.textContent = "Weather loaded successfully.";

    weatherResult.classList.remove("hidden");

    retryButton.classList.add("hidden");

    cityName.textContent =
        `${location.name}, ${location.country}`;

    temperature.textContent =
        `${weatherData.current.temperature_2m} °C`;

    windSpeed.textContent =
        `${weatherData.current.wind_speed_10m} km/h`;

    weatherCode.textContent =
        weatherData.current.weather_code;
}



function showError(message) {

    status.textContent =
        `Error: ${message}`;

    weatherResult.classList.add("hidden");

    retryButton.classList.remove("hidden");
}



weatherForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        return;
    }

    lastCity = city;

    fetchWeather(city);
});




retryButton.addEventListener("click", function () {

    if (lastCity) {
        fetchWeather(lastCity);
    }
});