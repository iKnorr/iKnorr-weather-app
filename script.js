// Setting variables

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=4739904bd0e17a0b10ab5e88b48f19b7
const API = '4739904bd0e17a0b10ab5e88b48f19b7';

const errorMsg = document.querySelector('.error-msg');

const infoWrapper = document.querySelector('.info-wrapper');

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

// Error msg function
const errorMessage = function (msg) {
  errorMsg.insertAdjacentText('afterbegin', msg);
  // setTimeout(() => {
  //   // errorMsg.style.display = 'none';
  //   msg = '';
  // }, 1000);
  // errorMsg.style.oacity = 0;
};

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

  temperature.innerText = `${parseInt(data.main.temp)}°`;
  feelsLikeTemp.innerText = `feels like ${parseInt(data.main.feels_like)}°`;

  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherMain.innerText = data.weather[0].description;
};

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// ('https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=662534729365838403424x3629');
// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;

//     return fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=662534729365838403424x3629`
//     )
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//       });
//   });
// };

// whereAmI();

// get local weather on page load
let lat;
let lon;

// Geolocation
const success = function (pos) {
  console.log(pos);
  const position = pos.coords;
  lat = position.latitude;
  lon = position.longitude;
};

// const error = () => {
//   errorMsg.innerText =
//     'Unable to find your location. Turn on device location or use search!';
// };

navigator.geolocation.getCurrentPosition(success);

// On window load display local weather
window.addEventListener('load', () => {
  const getMyLocationWeather = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`
    );
    // if (!response.ok) {
    //   errorMessage('Problem getting location data');
    //   // errorMsg.innerText = 'Unable to find your location.';
    //   throw new Error('Problem getting location data');
    // }
    const data = await response.json();
    console.log(data);
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
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API}&units=metric`
      );
      if (!response.ok) {
        // errorMessage('heeeeelp');
        throw new Error(`City not found (${response.status})`);
      }
      errorMessage('');
      const data = await response.json();
      console.log(data);

      getData(data);
    } catch (err) {
      console.log('caught it');
      errorMessage('Problem getting location');
      // setTimeout(() => {
      //   errorMessage();
      // }, 500);
    }
  };
  getWeatherData();

  input.value = '';
});
