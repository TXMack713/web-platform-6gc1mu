/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/
const submit = document.getElementById('submit');
submit.addEventListener('click', getLocation);
// submit.addEventListener('click', function () {
//   alert('You hit the submit button');
// });
// let location = [];
let city = '';
let country = '';

async function getLocation() {
  const entry = document.getElementById('location').value;
  const location = entry.split(',');
  for (let i = 0; i < location.length; i++) {
    location[i] = location[i].trim();
    console.log(location[i]);
  }
  const x = isNaN(location[0]);
  console.log(x);

  if (x === false) {
    console.log('Number statement');
    const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${location[0]}&appid=f51a778f79966048f8772e1c2dfb9667`;
    const response = await fetch(url);
    const locationData = await response.json();
    city = locationData['name'];
    country = locationData['country'];
    console.log(locationData);
    getZipWeather(locationData);

    /*
    if (response.status >= 200 && response.status <= 299) {
      const locationData = await response.json();
      console.log(locationData);
      getWeather(locationData);
    } else {
      // Handle errors
      console.log('The problem is in the zip code api.');
      console.log(response.status, response.statusText);
    }
     */
  } else if (x === true) {
    console.log(location);
    console.log(location.length);
    console.log('Else statement');

    if (location.length === 2) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location[0]},${location[1]}&appid=f51a778f79966048f8772e1c2dfb9667`;
      console.log(location[0] + ', ' + location[1]);
      city = location[0];
      country = location[1];
      console.log(url);

      const response = await fetch(url);
      const locationData = await response.json();
      console.log(locationData);
      getTextWeather(locationData);

      /*
      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
        getWeather(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
       */
    } else if (location.length === 3) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location[0]},${location[1]},${location[2]}&appid=f51a778f79966048f8772e1c2dfb9667`;
      console.log(url);
      city = location[0];
      country = location[2];
      const response = await fetch(url);
      const locationData = await response.json();
      console.log(locationData);
      getTextWeather(locationData);

      /* if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
        getWeather(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      } */
    }
  }
}

async function getTextWeather(data) {
  console.log("Here's the data being passed to the getWeather method");
  console.log(data);

  const lat = data[0]['lat'];
  const lon = data[0]['lon'];
  console.log(lat);
  console.log(lon);
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=f51a778f79966048f8772e1c2dfb9667`;
  const response = await fetch(weatherURL);
  const weatherData = await response.json();
  console.log(weatherData);
  populateWeather(weatherData);
  /*
  if (response.status >= 200 && response.status <= 299) {
    const weatherData = await response.json();
    console.log(weatherData);
    populateWeather(weatherData);
  } else {
    // Handle errors
    console.log('Error is in the getWeather method');
    console.log(response.status, response.statusText);
  }
   */
  // console.log(weatherData);
}

async function getZipWeather(data) {
  console.log("Here's the data being passed to the getWeather method");
  console.log(data);

  const lat = data['lat'];
  const lon = data['lon'];
  console.log(lat);
  console.log(lon);
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=f51a778f79966048f8772e1c2dfb9667`;
  const response = await fetch(weatherURL);
  const weatherData = await response.json();
  console.log(weatherData);
  populateWeather(weatherData);
  if (response.status >= 200 && response.status <= 299) {
    const weatherData = await response.json();
    console.log(weatherData);
    populateWeather(weatherData);
  } else {
    // Handle errors
    console.log('Error is in the getWeather method');
    console.log(response.status, response.statusText);
  }
  // console.log(weatherData);
}

function populateWeather(data) {
  //Retrieve the desired weather data to present
  const temp = Math.round(data['current']['temp']);
  // const feelsLike = data['current']['feels_like'];
  // const timezone = data['timezone'];
  const description = data['current']['weather'][0]['description'];
  const highTemp = Math.round(data['daily'][0]['temp']['max']);
  const lowTemp = Math.round(data['daily'][0]['temp']['min']);
  const windSpeed = Math.round(data['current']['wind_speed']);
  // const windGust = Math.round(data['current']['wind_gust']);
  // const weatherAlert = data['alerts'][0]['description'];
  // const weatherEvent = data['alerts'][0]['event'];

  // Populate the screen with the current weather information
  const weatherSection = document.getElementById('weather_display');

  const locale = document.createElement('h2');
  locale.textContent = city + ', ' + country;

  const current = document.createElement('p');
  current.textContent = 'Current temp: ' + temp + '°F';

  const condition = document.createElement('p');
  condition.textContent = 'Current condition: ' + description;

  const range = document.createElement('p');
  range.textContent = 'High: ' + highTemp + '°F       Low: ' + lowTemp + '°F';

  const winds = document.createElement('p');
  winds.textContent = 'Winds currently at ' + windSpeed + ' MPH';

  /*

  const currentAdvisory = document.createElement('p');
  currentAdvisory.textContent = 'Current weather advisory: ' + weatherEvent;

  const advisoryDescription = document.createElement('p');
  advisoryDescription.textContent = weatherAlert;

  */
  weatherSection.textContent = '';
  weatherSection.appendChild(locale);
  weatherSection.appendChild(current);
  weatherSection.appendChild(condition);
  weatherSection.appendChild(range);
  weatherSection.appendChild(winds);
  // weatherSection.appendChild(currentAdvisory);
  // weatherSection.appendChild(advisoryDescription);
}
