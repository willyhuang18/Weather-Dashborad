//giving an empty variable to store city
var city ="";
//giving variable for html element
//set up the API key
var key = "31c479aa4f3f64f2fad8f58a010a4b7e";
//declare function for searching input to display
function display(event){
    event.preventDefault();
    if($("#input").val().trim() !==""){
        city = $("#input").val().trim();
        currentWeather(city);
    }
}
$("#search-button").on("click",display)

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
        // this will hold the icon
        var weatherIcon = response.weather[0].icon
        //source from open weather map icon
        var weatherIconUrl ="https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        //this will representation of the date portion of the specified date in the user agent's timezone.
        var timeZone = new Date(response.dt*1000).toLocaleDateString();//dt is the data from weather API
        console.log(timeZone);
        //display everything above into the current city section
        $("#current").html("Current city: " + response.name + "(" + timeZone+  ")" + "<img src="+ weatherIconUrl +">")
        //display the temp for the city
        $("#temperature").html(response.main.temp +" &#8457");
        //display the humidity
        $("#humidity").html(response.main.humidity + "%");
        //need to convert the wind speed to MPH, format from wind speed converter
        $("#wind").html((response.wind.speed * 2.237).toFixed(1) + "MPH");
    })
}