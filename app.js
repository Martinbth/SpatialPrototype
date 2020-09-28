// var output = document.querySelector('#showData');

var geo = document.querySelector('#geo');
const playSound = document.querySelector('#playSound');
const stopSound = document.querySelector('#stopSound');
const changeSound = document.querySelector('#changeSound');



const planeLat = 59.574054;
const planeLong = 17.839554;
const tankLat = 59.5745646;
const tankLong = 17.840553;

var plane = new Howl({
  src: ['./sounds/airplane.mp3'],
  loop: true,
  autoplay: false,
  volume: 1
});

var tank = new Howl({
   src: ['./sounds/tankfiring.mp3'],
   autoplay: false,
   loop: true,
   volume: 1,
});
tank.pos(100,0,0);
plane.pos(-50,0,-100);



playSound.addEventListener('click', () => {
   tank.play();
});

stopSound.addEventListener('click', () => {
   tank.stop();
});

changeSound.addEventListener('click', () => {
   tank.volume(Math.random());
});






//
// function adjustVolume(distTank,distPlane){
//   var newVolTank = 1-distTank;
//   var newVolPlane = 1-distPlane;
//
// tank.volume(newVolTank);
// plane.volume(newVolPlane);
// }

function handleOrientation(event) {
  var x = degreesToRadians(event.beta);
  var y = degreesToRadians(event.gamma);
  var z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);

  geo.innerHTML = "hej";
  // geo.innerHTML +=y;
  // geo.innerHTML +=z;
}
window.addEventListener('deviceorientation', handleOrientation);

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}








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

//   var watchID = navigator.geolocation.watchPosition(function(position) {
//     // geo.innerHTML += 'latitude:'+ position.coords.latitude + '\n';
//     // geo.innerHTML += 'longitude:'+ position.coords.longitude + '\n';
//     var distTank = distance(position.coords.latitude,position.coords.longitude, 59.5745646,17.840553);
//     // var distPlane = distance(position.coords.latitude,position.coords.longitude, 59.574054,17.839554);
//     // geo.innerHTML += "distance to Plane:"+ distPlane + "\n";
//     // adjustVolume(distTank,distPlane);
// });
//
// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };
//
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// }
//
// function distance(lat1, lon1, lat2, lon2, M) {
// 	if ((lat1 == lat2) && (lon1 == lon2)) {
// 		return 0;
// 	}
// 	else {
// 		var radlat1 = Math.PI * lat1/180;
// 		var radlat2 = Math.PI * lat2/180;
// 		var theta = lon1-lon2;
// 		var radtheta = Math.PI * theta/180;
// 		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 		if (dist > 1) {
// 			dist = 1;
// 		}
// 		dist = Math.acos(dist);
// 		dist = dist * 180/Math.PI;
// 		dist = dist * 60 * 1.1515;
// 		if (unit=="K") { dist = dist * 1.609344 }
// 		if (unit=="N") { dist = dist * 0.8684 }
// 		return dist;
// 	}
// }
function initMap() {
        var bounds = new google.maps.LatLngBounds;


        var origin1 = {lat: 55.93, lng: -3.118};


        var destinationB = {lat: 50.087, lng: 14.421};


        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1, origin2],

          unitSystem: google.maps.UnitSystem.METRIC,

        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              geocoder.geocode({'address': originList[i]},
                  showGeocodedAddressOnMap(false));
              for (var j = 0; j < results.length; j++) {
                geocoder.geocode({'address': destinationList[j]},
                    showGeocodedAddressOnMap(true));
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';
              }
            }
          }
        });
      }
