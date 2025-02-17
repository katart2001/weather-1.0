"use strict";

//! Время

function updateTime() {
    const currentTimeElement = document.getElementById('current_time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    currentTimeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);

updateTime();

//! Дата

function updateDate() {
    const currentDateElements = document.querySelectorAll('.current_date');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    currentDateElements.forEach(element => {
        element.textContent = `${day}.${month}.${year}`;
    });
}
updateDate();

//! Город

function updateCity() {
    const currentCityElement = document.getElementById('current_city');
    console.log('Fetching city data...');

    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=3f9eb17a9cb3436fba16b4e9d2e73081`)
        .then(response => {
            console.log('Received response from geolocation API'); 
            return response.json();
        })
        .then(data => {
            if (currentCityElement) {
                currentCityElement.textContent = data.city;
                console.log(`City: ${data.city}`); 
                updateWeather(data.city);
            } else {
                console.error('Element with id current_city not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
            if (currentCityElement) {
                currentCityElement.textContent = 'Unable to determine city';
            }
        });
}

updateCity();

//! Дни недели

function updateDay() {
    const currentDayElement = document.getElementById('current_day');
    const now = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    currentDayElement.textContent = dayOfWeek;
}

updateDay();

//! Погода

function updateWeather(city) {
    const currentWeatherElement = document.getElementById('current_weather');
    const apiKey = 'a6ff3e68fdfe43d4982181626251002'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.json();
        })
        .then(data => {
            const temperature = Math.round(data.current.temp_c);
            const description = data.current.condition.text;
            currentWeatherElement.textContent = `${temperature}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            currentWeatherElement.textContent = 'Unable to determine weather';
        });
}



