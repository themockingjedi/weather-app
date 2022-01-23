function formalDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `Last updated: ${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);

  temperature = response.data.main.temp;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let date = document.querySelector("#date");
  date.innerHTML = formalDate(response.data.dt * 1000);

  let weatherPic = document.querySelector("#weather");
  weatherPic.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherPic.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "2d15662f0a607d166c07789453c7a23b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celcius = ((temp.innerHTML - 32) * 5) / 9;
  temp.innerHTML = Math.round(celcius);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temp.innerHTML = Math.round(temperature);
}

let temperature = null;

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Boston");
