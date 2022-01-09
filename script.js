//giving an empty variable to store city
var city ="";
//giving variable for html element
//set up the API key
var key = "d81037013b1c0407cea56645f559ee00";

//get a ajax call for the current city stat
function currentWeather(city){
    //get the data from API
    var weatherUrl ="https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ key;
    $.ajax({
        url: weatherUrl,
        method:"GET",
    }).then(function(response){
        //log to check the city
        console.log(response);
        //create the weather Icon
        var weatherIcon = response.weather[0].icon
        console.log(weatherIcon);
    })
}
currentWeather(city);