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

function displayTemp(response) {
  console.log(response.data);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather["0"].main;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "59ebc73950183d72b027190e832e1b5b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Montreal&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
