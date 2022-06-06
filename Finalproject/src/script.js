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

function convertCelcius() {
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = "30°C";
}

let celciusTemp = document.querySelector(".celcius");
celciusTemp.addEventListener("click", convertCelcius);

function convertFahrenheit() {
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = "50°F";
}
let fahrenheitTemp = document.querySelector(".fahrenheit");
fahrenheitTemp.addEventListener("click", convertFahrenheit);

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
