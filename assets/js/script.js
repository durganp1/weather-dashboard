var cityInputEl = document.querySelector("#city-submit");
var cityEl = document.querySelector("#city-input");
var inputButtonEl = document.querySelector("#button-addon2");
var todayWeatherWrapperEl = document.querySelector("#weather-wrapper");


var cityNameSearch = function(city) {
     var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=188f221ff04011df267287eed52e6cf0";
     fetch(currentWeatherApi)
         .then(function(response) {
             if (response.ok) {
                 response.json().then(function(data) {
                    console.log(data, city);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    cityForecast(data, lat, lon);
                    });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
        });
};

var cityForecast = function(data,lat, lon) {
    var weatherForecastApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=188f221ff04011df267287eed52e6cf0";
    fetch(weatherForecastApi)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeatherEl(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
        });
};

var citySubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityEl.value.trim();
    if (cityName) {
        cityNameSearch(cityName);
        cityEl.value = "";
    }
    else {
        alert("Please enter a city name.");
    }
};

cityInputEl.addEventListener("submit", citySubmitHandler);

var displayWeatherEl = function(data) {
    
    var cityDate = document.getElementById("city-date");
        cityDate.textContent = data.;
    var todaysTemp = document.getElementById("todays-temp");
        todaysTemp.textContent = "Temperature " + data.current.temp;
    var todaysHumidity = document.getElementById("todays-humidity");
        todaysHumidity.textContent = "Humidity " + data.current.humidity;
    var todaysWind = document.getElementById("todays-wind");
        todaysWind.textContent = "Wind Speed " + data.current.wind_speed;
    var todaysUv = document.getElementById("todays-uv");
        todaysUv.textContent = "UV Index " + data.current.uvi;
    
    
    
}

