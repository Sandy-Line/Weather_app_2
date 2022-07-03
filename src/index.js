// This function formats the date and the hour
function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}:${minutes}`;
}

//This function change the weather image from the medias folder
function displayImage(iconUrl) {
  if (iconUrl === `http://openweathermap.org/img/wn/01d@2x.png`) {
    document.getElementById("image").src = "medias/sun.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/02d@2x.png`) {
    document.getElementById("image").src = "medias/cloudy.png";
  } else if (
    iconUrl === `http://openweathermap.org/img/wn/03d@2x.png` ||
    `http://openweathermap.org/img/wn/04d@2x.png`
  ) {
    document.getElementById("image").src = "medias/cloud.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/09d@2x.png`) {
    document.getElementById("image").src = "medias/shower.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/10d@2x.png`) {
    document.getElementById("image").src = "medias/rainy.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/11d@2x.png`) {
    document.getElementById("image").src = "medias/storm.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/13d@2x.png`) {
    document.getElementById("image").src = "medias/snowy.png";
  } else if (iconUrl === `http://openweathermap.org/img/wn/50d@2x.png`) {
    document.getElementById("image").src = "medias/mist.png";
  } else {
    document.getElementById("image").src = "medias/clear.png";
  }
}

//This function display the forecast COLUMNS
function displayForecastColumns() {
  let weatherForecast = document.querySelector("#weather-forecast");
  let forecastColumns = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastColumns =
      forecastColumns +
      `
              <div class="col-2 forecast-column">
                <div class="forecast-date">${day}</div>
                <img src="medias/rainy.png" alt="" class="img-forecast" />
                <div class="forecast-temp">
                  <span class="max-temp">18°</span>
                  <span class="min-temp">22°</span>
                </div>
              </div>
            `;
  });

  forecastColumns = forecastColumns + `</div>`;
  weatherForecast.innerHTML = forecastColumns;
}

//This fonction get the API reponse and dispatches it on HTML
function displayTemp(response) {
  console.log(response);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather["0"].main;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.ceil(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let image = document.querySelector("#image");
  let icon = response.data.weather["0"].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  image.setAttribute("src", iconUrl);
  displayImage(iconUrl);
}

// This function receive the value (city) and make the api call
function search(city) {
  let apiKey = "59ebc73950183d72b027190e832e1b5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

// This function takes the value (city) of the input when Search button is click
function searchValue(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input");
  search(city.value);
}

// This function convert to Farhenheit and underline the °F
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitIcon = document.querySelector("#fahrenheit");
  fahrenheitIcon.style.textDecoration = "underline";
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}

//This function convert back to Celsius
function convertBackToCelsius(event) {
  event.preventDefault();
  let degreeCelsius = document.querySelector("#temperature");
  degreeCelsius.innerHTML = Math.ceil(celsiusTemperature);
  let fahrenheitIcon = document.querySelector("#fahrenheit");
  fahrenheitIcon.style.textDecoration = "none";
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchValue);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertBackToCelsius);

search("Paris");
displayForecastColumns();
