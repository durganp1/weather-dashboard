var cityInputEl = document.querySelector("#city-submit");
var cityEl = document.querySelector("#city-input");
var inputButtonEl = document.querySelector("#button-addon2");


var cityNameSearch = function(city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",&appid=188f221ff04011df267287eed52e6cf0";
    fetch(weatherApi).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayDailyWeather(data, city)
            })
        }
    })
}

var citySubmitHandler = function(event) {
    //debugger;
    var cityName = cityEl.value.trim();
    if (cityName) {
        cityNameSearch(cityName);
    }
    else {
        alert("Please enter a city name.");
    }
};

cityInputEl.addEventListener("click", citySubmitHandler);