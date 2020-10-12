// var output = document.querySelector('#showData');
// const playSound = document.querySelector('#playSound');
// const stopSound = document.querySelector('#stopSound');
// const changeSound = document.querySelector('#changeSound');
var plane = new Howl({
  src: ['./sounds/airplane.mp3'],
  loop: true,
  autoplay: true,
  volume: 1
});

var tank = new Howl({
  src: ['./sounds/tankfiring.mp3'],
  autoplay: true,
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

// geolocationbutton.addEventListener('click', () => {
// });

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
const planeLat = 59.572636;
const planeLong = 17.845729;
const tankLat = 59.574581;
const tankLong = 17.840469;
const status = document.querySelector('#status');
const distance = document.querySelector('#distance');
const mapLink = document.querySelector('#map-link');
const planeStatus = document.querySelector('#plane');
const tankStatus = document.querySelector('#tank');

function geoFindMe() {
  mapLink.href = '';
  mapLink.textContent = '';
  var userLat;
  var userLong;
  var tankDistance;
  var planeDistance;
  var tankV;
  var planeV;


  function success(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    status.textContent = 'success';
    status.textContent = '';

    tankDistance = calculateDistance(tankLat, tankLong, userLat, userLong);
    planeDistance = calculateDistance(planeLat, planeLong, userLat, userLong);
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${userLat}/${userLong}`;
    // mapLink.textContent = `Latitude: ${userLat} °, Longitude: ${userLong} °`;

    tankV = regulateVolume(tankDistance);
    tankStatus.textContent = '';
    tankStatus.textContent ='tank vol: ' + tankV;


    planeV = regulateVolume(planeDistance);
    planeStatus.textContent = '';
    planeStatus.textContent ='\b plane vol: ' + planeV;
    // tank.volume(tankV);
    //
    // plane.volume(regulateVolume(planeDistance));
  ;
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
// 100-0m = 1000*0.001 = 0.1  (75m / 100) - 1 = 0.25
// 80-0m

function regulateVolume(dist) {
  var v;
  // distance.textContent +='dist: ' + dist;

  if (dist > 100) {
      // distance.textContent += 'dist > 100';
      v = 0.1;
  }else if (dist < 0) {
      // distance.textContent += 'dist < 0';
      v = 1;
  }else {
      // distance.textContent += 'else:';
      v = 1-(dist/100);
      // distance.textContent +='vol set to:' + v;
  }
  return v;
}
