const API_KEY = "ddd38343ddeed938883dd12b3067f983";
let coordsLocation;
let latitude;
let longitude;
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");

async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temp.textContent = data.main.temp;
    maxTemp.textContent = data.main.temp_max;
    minTemp.textContent = data.main.temp_min;
  } catch (error) {
    console.error("Erreur de récupération :", error);
  }
}

async function getCoordsLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      () => reject("Erreur : nous n'avons pas pu trouver la localisation.")
    );
  });
}

async function init() {
  try {
    coordsLocation = await getCoordsLocation();
    latitude = coordsLocation.latitude;
    longitude = coordsLocation.longitude;
    await getWeather(latitude, longitude);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
