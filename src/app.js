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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily; //instead of an array w/days of the week, you'd use "hourly" for hourly, etc.

  let forecastElement = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`; //using html within javascript

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <figure class="text-center">
            <div class="weekly-forecast">${formatDay(forecastDay.dt)}</div>
             <img src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png"
             alt=""
             width="50"
             class="weekly-forecast"
             />
              <div class="forecast-temps">
              <span class="max-temp"> ${Math.round(
                forecastDay.temp.max
              )}° </span> |
              <span class="min-temp"> ${Math.round(
                forecastDay.temp.min
              )}° </span>
          </div>
          </figure>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2d15662f0a607d166c07789453c7a23b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
}

function getCurrentCityTemp(response) {
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

  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiKey = "2d15662f0a607d166c07789453c7a23b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getCurrentCityTemp);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
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

let currentLoc = document.querySelector("#current-city");
currentLoc.addEventListener("click", getCurrentCity);

search("Boston");
