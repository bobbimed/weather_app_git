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

function searchBarResult(event) {
  event.preventDefault();
  let resultCity = document.querySelector("#city-look");
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${resultCity.value}`;
}

let submitForm = document.querySelector("#search-form");
submitForm.addEventListener("submit", searchBarResult);
submitForm.addEventListener("click", searchBarResult);

function celciusClick(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = "";
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celciusClick);

function fahrenheitClick(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = "";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitClick);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
}
function displayTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let currentTemp = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].main;
  currentTemp.innerHTML = `${temperature} `;
}

let form = document.querySelector("#search-form");

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-look");
  let displayCity = document.querySelector("h1");
  displayCity.innerHTML = searchInput.value;
  let apiKey = "d035eb1b266b5380938f5fa0470bc61e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
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

  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  currentTemp.innerHTML = `${temperature}`;
  cityName.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
}

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d035eb1b266b5380938f5fa0470bc61e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
