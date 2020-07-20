var cityInputEl = document.querySelector("#city-submit");
var cityEl = document.querySelector("#city-input");
var inputButtonEl = document.querySelector("#button-addon2");
var todayWeatherWrapperEl = document.querySelector("#weather-wrapper");
var weatherForecastEl = document.querySelector("#forecast-container");
var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


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
        //selectCityEl(cityName);
        //console.log(cityName);
        //cityEl.value = "";
    }
    else {
        alert("Please enter a city name.");
    }
};

cityInputEl.addEventListener("submit", citySubmitHandler);

var displayWeatherEl = function(data) {
    //debugger;
    var cityDate = document.getElementById("city-date");
        cityDate.textContent = capitalizeFirstLetter(cityEl.value.trim()) + " - " + today;
    var todaysTemp = document.getElementById("todays-temp");
        todaysTemp.textContent = "Temperature " + " - " + data.current.temp + "ºF";
    var todaysHumidity = document.getElementById("todays-humidity");
        todaysHumidity.textContent = "Humidity " + " - " + data.current.humidity + "%";
    var todaysWind = document.getElementById("todays-wind");
        todaysWind.textContent = "Wind Speed " + " - " + data.current.wind_speed + " MPH";
    var todaysUv = document.getElementById("todays-uv");
        todaysUv.textContent = "UV Index " + " - " + data.current.uvi;
        for (i=0; i<=4; i++) {
            //debugger;
            var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                date.setDate(date.getDate() + i);
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();
                date = mm + '/' + dd + '/' + yyyy;  
            var forecastDate = document.createElement("div");
                forecastDate.textContent = date;
                console.log(forecastDate);
            var forecastIcon = document.getElementById("#wicon");
                forecastIcon = data.daily[i].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";
                forecastIcon.textContent = iconUrl.value
                console.log(forecastIcon);
            var forecastTemp = document.createElement("div");
                forecastTemp.textContent = "Temperature " + " - " + data.daily[i].temp.max + "ºF";
                console.log(forecastTemp);
            var forecastHumidity = document.createElement("div");
                forecastHumidity.textContent = "Humidity " + " - " + data.daily[i].humidity + "%";
                console.log(forecastHumidity);
             
                forecastTemp.appendChild(forecastHumidity);
                forecastDate.appendChild(forecastTemp);
            
                weatherForecastEl.appendChild(forecastDate);
            } 
            
        
    
    
    
    
}

