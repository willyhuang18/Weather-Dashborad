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
        var weatherIconUrl ="https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
        //this will representation of the date portion of the specified date in the user agent's timezone.
        var timeZone = new Date(response.dt*1000).toLocaleDateString();//dt is the data from weather API
        console.log(timeZone);
        //display everything above into the current city section
        $("#current").html("Current city: " + response.name + "(" + timeZone+  ")" + "<img src="+ weatherIconUrl +">")
        //display the temp for the city
        //need to convert Kelvin to Fahrenheit, formula from w3school
        $("#temperature").html(((response.main.temp - 273.15) * 1.80 + 32 ).toFixed(2) +" &#8457");
        //display the humidity
        $("#humidity").html(response.main.humidity + "%");
        //need to convert the wind speed to MPH, formula from wind speed converter
        $("#wind").html((response.wind.speed * 2.237).toFixed(1) + "MPH");
        //execute the UV function
        UV(response.coord.lat,response.coord.lon);

    })
}

//need different ajax function to get the UV index
function UV(lat,lon){//lat:latitude ;lon:longitude; 
    var UVurl = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url:UVurl,
        method: "GET"
    }).then(function(response){
        $("#UV").html(response.value);
    })
    //try to calc the data in the for loop 
    function forecast(hourly){
        var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+hourly+"&appid="+key;
        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
        })
    }
    forecast();
}

//declare function that 5 days forecast 
// function forecast(id){
//     var forecastUrl = "api.openweathermap.org/data/2.5/forecast?q="+ id + "&appid=" + key;
//     $.ajax({
//         url:forecastUrl,
//         method: "GET"
//     }).then(function(response){
//         //give a for loop for next five day

//         for (var i = 0; i <5 ; i++) {
//            //date variable
//            //icon variable
//            //temp variable
//            //humidity variable
//            //contain them into one variable
//            var forecast = `<div class="bg-primary text-light m-3 p-2 rounded">
//            <p ${date[i]}></p>
//            <p ${icon[i]}></p>
//            <p>Temp: <span ${temp}></span></p>
//            <p>Humidity: <span ${humi}></span></p>
//        </div>`           
//        $("#forecast").append(forecast);  
//         }
//     })
// }