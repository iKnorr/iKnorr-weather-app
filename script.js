// Setting variables

const API = '4739904bd0e17a0b10ab5e88b48f19b7';

const ldSpinner = document.querySelector('.ld-spinner');
const errorMsg = document.querySelector('.error-msg');

const infoWrapper = document.querySelector('.info-wrapper');

const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const geoLocBtn = document.querySelector('.geo-loc-btn');

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

// Geolocation
let lat;
let lon;

const whereAmI = function () {
  const success = function (pos) {
    console.log(pos);
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
  };

  const error = () => {
    errorMsg.innerText = '';
  };

  navigator.geolocation.getCurrentPosition(success, error, {
    maximumAge: 10000,
    timeout: 5000,
    enableHighAccuracy: true,
  });
};
whereAmI();

// Get data function
const getData = function (data) {
  errorMsg.textContent = '';
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

  temperature.innerText = `${parseInt(data.main.temp)}°`;
  feelsLikeTemp.innerText = `feels like ${parseInt(data.main.feels_like)}°`;

  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherMain.innerText = data.weather[0].description;
};

// Error handling for api calls
const catchError = function (err) {
  if (!err) {
    errorMsg.textContent = '';
  } else {
    errorMsg.textContent = err;
  }
};

// On window load
window.addEventListener('load', () => {
  const getMyLocationWeather = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=nizza&appid=${API}&units=metric`
      );
      if (!response.ok) {
        throw new Error(
          `Something went wrong 😱. Please turn on location device.`
        );
      }
      // ldSpinner.style.display = 'inline-block';
      const data = await response.json();
      // ldSpinner.style.display = 'none';

      console.log(data);
      getData(data);
    } catch (err) {
      catchError(err);
    }
  };
  getMyLocationWeather();
});

geoLocBtn.addEventListener('click', () => {
  whereAmI();
  const getMyLocationWeather = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
      );
      if (!response.ok) {
        throw new Error(
          `Something went wrong 😱. Please turn on location device.`
        );
      }
      // ldSpinner.style.display = 'inline-block';
      const data = await response.json();
      // ldSpinner.style.display = 'none';

      console.log(data);
      getData(data);
    } catch (err) {
      catchError(err);
    }
  };
  getMyLocationWeather();
});

// Calling API / displaying content
searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const searchInput = input.value;

  const getWeatherData = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Something went wrong 😱. City not found.`);
      }
      // ldSpinner.style.display = 'inline-block';
      const data = await response.json();
      // ldSpinner.style.display = 'none';
      console.log(data);

      getData(data);
    } catch (err) {
      catchError(err);
    }
  };
  getWeatherData();

  input.value = '';
});
