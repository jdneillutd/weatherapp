var x = document.getElementById("quote");
var crd;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//document.getElementById("ftoc").onclick = fToC();

function getWeather() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(useLoc, error, options);
          
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function useLoc(pos){
  crd = pos.coords;
  console.log(crd.latitude);
  console.log(crd.longitude);
  var crdStr = crd.latitude + "," + crd.longitude
  setCity(crdStr);
  callDarkSky(crdStr);
}
function callDarkSky(crdStr){
    var darkSkyURL = "https://api.darksky.net/forecast/0ecd859df8ca5eb9539da07f4031c29d/" + crd.latitude + "," + crd.longitude;
    $.ajax({
      type: "GET",
      url: darkSkyURL,
      dataType: "jsonp",
      success: weather
    });
}
function weather(data){
  var fOrC = document.getElementById("ftoc");
  var temp = data.currently.temperature ;
  var summary = data.currently.summary;
  var precipProbability = data.currently.precipProbability ;
  if (fOrC.innerHTML == "Celsius") {
    temp = roundNumber(celsius(temp), 1) + "°C";
  } else{
    temp = roundNumber(temp, 1) + "°F";
  }
  $('#temp').html(temp);
  $('#summary').html(summary);
  $('#precip-probability').html(precipProbability + "% Chance of rain");
  var skycons = new Skycons({"color": "white"});
  skycons.add("icon1", data.currently.icon);
  skycons.play();
}
function celsius(tmp){
  return ((tmp-32)*5)/9;
}
function setCity(crdStr) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + crdStr + "&sensor=true";
  url = url.replace(/\s/g, "");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#bigtoptext').html(data.results[0].address_components[2].long_name);
    },
    method: "GET"
  });
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

//function getWeather(){
  /*$.get(darkSkyURL, function(data, status){
    latitude = data['latitude''];
    longitude = data['longitude''];
    time = data['current']['time'];
  });
  */

//}
/*function getWeather(){
  loaction = getLocation();
  var darkSkyURL = "https://api.darksky.net/forecast/0ecd859df8ca5eb9539da07f4031c29d/" + userCoords[0] + "," + userCoords[1];
  x.innerHTML = darkSkyURL;
}
*/


$( document ).ready(function() {
    getWeather();

    //getWeather();
});

function toggleClick() {
  console.log("clicked");
  var change = document.getElementById("ftoc");
  if (change.innerHTML == "Celsius") {
    change.innerHTML = "Fahrenheit";
    getWeather();
  } else {
    change.innerHTML = "Celsius";
    getWeather();
  }
}
function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}