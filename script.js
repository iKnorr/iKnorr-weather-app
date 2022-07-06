// Setting variables

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=4739904bd0e17a0b10ab5e88b48f19b7
const API = '4739904bd0e17a0b10ab5e88b48f19b7';

const input = document.querySelector('input');
const searchBtn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const country = document.querySelector('.country');
const area = document.querySelector('.area');

const temperature = document.querySelector('.temperature');
const feelsLikeTemp = document.querySelector('.feels-like-temp');

const humidityIcon = document.querySelector('.humidity-icon');
const humidity = document.querySelector('.humidity');

const windIcon = document.querySelector('.wind-icon');
const wind = document.querySelector('.wind');

const cloudsIcon = document.querySelector('.clouds-icon');
const clouds = document.querySelector('.clouds');

const icons = document.querySelectorAll('.icons');

const weatherIcon = document.querySelector('#weather-icon');
const weatherMain = document.querySelector('.weather-main');

const locationBtn = document.querySelector('.location');

// get local weather on page load
let lat;
let lon;

// Geolocation
const success = function (pos) {
  const position = pos.coords;
  lat = position.latitude;
  lon = position.longitude;
};

const error = () => {
  cityName.innerText =
    'Unable to find your location. Turn on device location or use search!';
};

navigator.geolocation.getCurrentPosition(success, error);

// Get data function
const getData = function (data) {
  // humidityIcon.innerHTML = '<i class="icons fa-solid fa-droplet"></i>';
  humidity.innerText = `${data.main.humidity}%`;

  // windIcon.innerHTML = '<i class="icons fa-solid fa-wind"></i>';
  wind.innerText = `${data.wind.speed}m/s`;

  // cloudsIcon.innerHTML = '<i class="icons fa-solid fa-cloud"></i>';
  clouds.innerText = `${data.clouds.all}%`;

  cityName.innerText = `${data.name},${data.sys.country}`;

  icons.forEach(icon => {
    icon.classList.remove('hidden');
  });
  // const tempKelvin = data.main.temp;
  // const tempCelsius = parseInt(tempKelvin - 273.15);
  // temperature.innerText = `${tempCelsius}°`;
  temperature.innerText = `${parseInt(data.main.temp)}°`;
  feelsLikeTemp.innerText = `feels like ${parseInt(data.main.feels_like)}°`;

  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherMain.innerText = data.weather[0].description;
};

// On window load display local weather
window.addEventListener('load', () => {
  const getMyLocationWeather = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    // icons.forEach(icon => {
    //   icon.classList.remove('hidden');
    // });
    // setTimeout(() => {
    getData(data);
    // }, 1000);
  };
  getMyLocationWeather();
});

// Calling API / displaying content
searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const searchInput = input.value;

  const getWeatherData = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API}&units=metric`
    );
    const data = await response.json();
    console.log(data);

    // icons.forEach(icon => {
    //   icon.classList.remove('hidden');
    // });

    getData(data);
  };
  getWeatherData();

  input.value = '';
});
