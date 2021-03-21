const COORDS = "coords";
const API_KEY = "b12dbc7706d7c07dc8e379f04e6883b6";
const weather = document.querySelector(".weather");

loadCoords();

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (!loadedCoords) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = { latitude, longitude };

  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log();
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}ºC @ ${place}`;
    });
}
