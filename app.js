// var output = document.querySelector('#showData');
console.log("outside");
// const playSound = document.querySelector('#playSound');
// const stopSound = document.querySelector('#stopSound');
// const changeSound = document.querySelector('#changeSound');



const planeLat = 59.574054;
const planeLong = 17.839554;


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
tank.pos(100, 0, 0);
plane.pos(-50, 0, -100);


// Buttons
// playSound.addEventListener('click', () => {
//    tank.play();
// });
//
// stopSound.addEventListener('click', () => {
//    tank.stop();
// });
//
// changeSound.addEventListener('click', () => {
//    tank.volume(Math.random());
// });

geolocationbutton.addEventListener('click', () => {

  geo.innerHTML += 'click/';
  geolocate();
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

  // geo.innerHTML +=y;
  // geo.innerHTML +=z;
}
window.addEventListener('deviceorientation', handleOrientation);

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}


// Geolocation / distance
window.addEventListener('DOMContentLoaded', geoFindMe);
const tankLat = 59.574564698765438;
const tankLong = 17.574564698765438;

function geoFindMe() {
  const status = document.querySelector('#status');
  const distance = document.querySelector('#distance');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    status.textContent = 'success';
    const distanceInM = calculateDistance(59.575341, 17.843545, latitude, longitude);
    // const distanceInM = calculateDistance(latitude,tankLat,longitude,tankLong);
    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    distance.textContent = `distance to tank is ${distanceInM}m`;


    // regulateVolume(tank,distanceInM);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.watchPosition(success, error);
  }

}

function calculateDistance(lat1, lon1, lat2, lon2) {
  status.textContent = 'calculateDistance';
  var R = 6371000; // km
  var dLat = (lat2 - lat1).toRad();
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = (R * c);
  return d;
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}


// change volume
function regulateVolume(object, dist) {
  if (dist > 100) {
    // object.volume(0);
    distance.textContent = `distance to tank is ${distanceInM}m and vol set to ${v}`;
  }
  if (dist < 0) {
    // object.volume(1);
    distance.textContent = `distance to tank is ${distanceInM}m and vol set to ${v}`;
  } else {
    const v = 1 - (dist / 100);
    distance.textContent = `distance to tank is ${distanceInM}m and vol set to ${v}`;
    // object.volume(v);
  }
}
