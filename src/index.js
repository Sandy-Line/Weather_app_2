function displayTemp(response) {
  console.log(response);
}

let apiKey = "59ebc73950183d72b027190e832e1b5b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
