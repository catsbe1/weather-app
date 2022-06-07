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
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let currentDay = document.querySelector("h5");
currentDay.innerHTML = `${day}, ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
          <div class = "weather-forecast-date">${formatDay(
            forecastDay.dt
          )}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" class="forecast-icon" />
         <div class="weather-forecast-temperatures">  
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )} ° </span>
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
        
        </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7c3b7ed986b71c5f6cb16c871e09e94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function changeLocation(event) {
  event.preventDefault();
  let newLocation = document.querySelector("#city");

  let location = document.querySelector("#location");
  location.innerHTML = newLocation.value;

  let apiKey = "7c3b7ed986b71c5f6cb16c871e09e94b";
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    newLocation.value +
    `&appid=` +
    apiKey +
    `&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(changeTemp);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", changeLocation);

function changeTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  celciusTemperature = temperature;
  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = `${temperature}°C`;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let extraInfo = document.querySelector(".extra-info");
  extraInfo.innerHTML = `
  <strong> Humidity </strong> ${humidity} % </br>
  <strong> Wind </strong> ${wind} m/s  </br>
  <strong> Pressure </strong> ${pressure}hPa`;
  let newDescription = response.data.weather[0].description;
  let description = document.querySelector(".today-description");
  description.innerHTML = `${newDescription}`;
  let location = document.querySelector("#location");
  location.innerHTML = response.data.name;
  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7c3b7ed986b71c5f6cb16c871e09e94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemp);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let returnHome = document.querySelector("#home");
returnHome.addEventListener("click", getPosition);
