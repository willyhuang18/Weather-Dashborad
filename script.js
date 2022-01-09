//giving an empty variable to store city
var city ="";
//giving variable for html element
//set up the API key
var key = "31c479aa4f3f64f2fad8f58a010a4b7e";
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
    })
}