//timestamp
let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} ${hour}:${minute}`;

//search
function displayWeather(response) {
  document.querySelector("#search-text-input").innerHTML = response.data.name;

  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}° F`;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  let formattedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  weatherDescription.innerHTML = formattedDescription;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}mph`;

  let cityOutput = document.querySelector("#city-output");
  cityOutput.innerHTML = `${response.data.name}`;
}

function search(event) {
  event.preventDefault();
  let apiKey = "210412f30f491d1c32937a20641fbe44";
  let searchInput = document.querySelector("#search-text-input");
  let cityOutput = document.querySelector("#city-output");
  cityOutput.innerHTML = `${searchInput.value}`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiURL).then(displayWeather);
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", currentLocation);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "210412f30f491d1c32937a20641fbe44";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);
