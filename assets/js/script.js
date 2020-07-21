var cityInputEl = document.querySelector("#city-submit");
var cityEl = document.querySelector("#city-input");
var inputButtonEl = document.querySelector("#button-addon2");
var todayWeatherWrapperEl = document.querySelector("#weather-wrapper");
var weatherForecastEl = document.querySelector("#forecast-container");
var saveCityHistoryEl = document.querySelector("#city-history");
var cityName = "";
var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var saveCityHistory = function(city) {
    
    var cityHistory = document.createElement("li");
        cityHistory.classList.add("todays-weather-data");
        cityHistory.textContent = city;
        saveCityHistoryEl.appendChild(cityHistory);
        cityEl.value = "";
};

var savedCitySearch = function(event) {
    debugger;
    cityName = event.target.textContent;
    cityNameSearch(cityName);
    
};

saveCityHistoryEl.addEventListener("click", savedCitySearch);



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
    
        cityName = cityEl.value.trim();
    if (cityName) {
        cityNameSearch(cityName);
        saveCitys(cityName);
        //selectCityEl(cityName);
        //console.log(cityName);
        
    }
    else {
        alert("Please enter a city name.");
    }
};

cityInputEl.addEventListener("submit", citySubmitHandler);

var displayWeatherEl = function(data) {
    weatherForecastEl.innerHTML = "";
    var cityDate = document.getElementById("city-date");
        cityDate.textContent = capitalizeFirstLetter(cityName + " (" + today + ")");
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
        $("#wicon").attr("src", iconUrl);
    var todaysTemp = document.getElementById("todays-temp");
        todaysTemp.textContent = "Temperature " + " - " + data.current.temp + "ºF";
    var todaysHumidity = document.getElementById("todays-humidity");
        todaysHumidity.textContent = "Humidity " + " - " + data.current.humidity + "%";
    var todaysWind = document.getElementById("todays-wind");
        todaysWind.textContent = "Wind Speed " + " - " + data.current.wind_speed + " MPH";
    var todaysUv = document.getElementById("todays-uv");
    var uvi = document.getElementById("uvi");
        uvi.textContent = data.current.uvi;
        if (uvi.textContent < 3) {
            uvi.style.backgroundColor = "green";
        } else if (uvi.textContent < 7){
            uvi.style.backgroundColor = "orange";
        } else {
            uvi.style.backgroundColor = "red";
        }
        todaysUv.textContent = "UV Index " + " - ";
    var forecastEl = document.getElementById("forecast-title");
        forecastEl.classList.add("forecast-title");
        forecastEl.textContent = "5-Day Forecast:";
    
        for (i=0; i<=4; i++) {
            
            var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                date.setDate(date.getDate() + i);
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();
                date = mm + '/' + dd + '/' + yyyy;  
            var forecastDate = document.createElement("div");
                forecastDate.classList.add("forecast-days");
                forecastDate.textContent = date;
                //debugger;
            var iconBox = document.createElement("IMG");
                iconBox.setAttribute("id", "iconBox");
            var iconCode = data.daily[i].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                    $("#iconBox").attr("src", iconUrl);
                
                
            
            var forecastTemp = document.createElement("div");
                forecastTemp.textContent = "Temperature " + " - " + data.daily[i].temp.max + "ºF";
                
            var forecastHumidity = document.createElement("div");
                forecastHumidity.textContent = "Humidity " + " - " + data.daily[i].humidity + "%";
                
                forecastDate.appendChild(iconBox);
                forecastTemp.appendChild(forecastHumidity);
                forecastDate.appendChild(forecastTemp);
            
                weatherForecastEl.appendChild(forecastDate);
            };  
            saveCityHistory(cityName);
            
};

var saveCitys = function(cityName) {

    localStorage.setItem("city", cityName);
};

var loadCitys = function() {
    cities = localStorage.getItem("city");
};