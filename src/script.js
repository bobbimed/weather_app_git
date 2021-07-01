let h2 = document.querySelector("h2");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#weekdays");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col-2">
          <div class="weather-forecast">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="40 "
          />
          <div class="forecast-temperatures">
            <span class="weekday-high">${Math.round(
              forecastDay.temp.max
            )}°</span>|<span class="weekday-low"
              >${Math.round(forecastDay.temp.min)}°</span
            >
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function searchBarResult(event) {
  event.preventDefault();
  let resultCity = document.querySelector("#city-look");
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${resultCity.value}`;
}

let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", searchBarResult);
submitForm.addEventListener("click", searchBarResult);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
}

function getForecast(coordinates) {
  let apiKey = "d035eb1b266b5380938f5fa0470bc61e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let currentTemp = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].description;
  currentTemp.innerHTML = `${temperature} `;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-look");
  let displayCity = document.querySelector("h1");
  displayCity.innerHTML = searchInput.value;
  let apiKey = "d035eb1b266b5380938f5fa0470bc61e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTemp);
}

form.addEventListener("submit", updateCity);
form.addEventListener("click", updateCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let cityName = document.querySelector(`#city-name`);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  currentTemp.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d035eb1b266b5380938f5fa0470bc61e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
