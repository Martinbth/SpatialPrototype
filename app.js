var output = document.querySelector('.output');
var geo = document.querySelector('.geo');

const planeLat = 59.574054;
const planeLong = 17.839554;
const tankLat = 59.574858;
const tankLong = 17.850841;
var plane = new Howl({
  src: ['./sounds/airplane.mp3'],
  loop: true,
   autoplay: true,
  volume: 1
});
var tank = new Howl({
<<<<<<< HEAD
   src: ['./sounds/tankfiring.mp3'],
   autoplay: true,
   loop: true,
   volume: 1
=======
  src: ['./sounds/tankfiring.mp3'],
   autoplay: true,
  loop: true,
  volume: 1
>>>>>>> 56f13837f300c343d3d9b560ba5b83662310996a
});
tank.pos(-20,0,5);
plane.pos(-50,0,-100);

<<<<<<< HEAD
=======

>>>>>>> 56f13837f300c343d3d9b560ba5b83662310996a
function adjustVolume(distTank,distPlane){
  var newVolTank = 1-distTank;
  var newVolPlane = 1-distPlane;

tank.volume(newVolTank);
plane.volume(newVolPlane);

}
function handleOrientation(event) {
  var x = degreesToRadians(event.beta);
  var y = degreesToRadians(event.gamma);
  var z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";
  output.innerHTML += "alpha: " + z + "\n";

}

window.addEventListener('deviceorientation', handleOrientation);

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

<<<<<<< HEAD
document.getElementById("goToOnboarding").addEventListener("click", function(){

});

=======
>>>>>>> 56f13837f300c343d3d9b560ba5b83662310996a





//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  var watchID = navigator.geolocation.watchPosition(function(position) {
    geo.innerHTML += "latitude:"+ position.coords.latitude + "\n";
    geo.innerHTML += "longitude:"+ position.coords.longitude + "\n";
    var distTank = distance(position.coords.latitude,position.coords.longitude, 59.574858,17.850841)
    var distPlane = distance(position.coords.latitude,position.coords.longitude, 59.574054,17.839554)
    geo.innerHTML += "distance to Tank:"+ distTank + "\n";
    geo.innerHTML += "distance to Plane:"+ distPlane + "\n";
    adjustVolume(distTank,distPlane);
});

<<<<<<< HEAD
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}
=======

>>>>>>> 56f13837f300c343d3d9b560ba5b83662310996a

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
