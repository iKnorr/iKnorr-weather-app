// https://api.openweathermap.org/data/2.5/weather?q=London&appid=4739904bd0e17a0b10ab5e88b48f19b7

const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const country = document.querySelector('.country');
const area = document.querySelector('.area');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const clouds = document.querySelector('.clouds');
const icons = document.querySelectorAll('.icons');
const weatherIcon = document.querySelector('#weather-icon');
const weatherMain = document.querySelector('.weather-main');

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const searchInput = input.value;

  const getWeatherData = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=4739904bd0e17a0b10ab5e88b48f19b7`
    );
    const data = await response.json();
    console.log(data);

    icons.forEach(icon => {
      icon.classList.remove('hidden');
    });

    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed}m/s`;
    clouds.innerText = `${data.clouds.all}%`;

    cityName.innerText = `${data.name}, `;
    country.innerText = data.sys.country;

    const tempKelvin = data.main.temp;
    const tempCelsius = parseInt(tempKelvin - 273.15);
    temperature.innerText = `${tempCelsius}°`;

    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherMain.innerText = data.weather[0].description;
  };
  getWeatherData();

  input.value = '';
});
