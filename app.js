const changeSound = document.querySelector('#changeSound');

var party = new Howl({
  src: ['./sounds/partyblow.mp3'],
  autoplay: false,
  loop: false,
  volume: 1,
});

var quack = new Howl({
  src: ['./sounds/quack.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});

var plane = new Howl({
  src: ['./sounds/airplane.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});


var tank = new Howl({
  src: ['./sounds/tankfiring.mp3'],
  autoplay: false,
  loop: true,
  volume: 1,
});
tank.pos(100, 0, 0);
plane.pos(-50, 0, -100);
quack.pos(-50, 0, -100);

var i = 0;
changeSound.addEventListener('click', () => {


  // console.log(i);
  // if (i == 1) {
  //   console.log("in 1");
  //   plane.stop();
  //   tank.stop();
  //   tank.play();
  //   i = 2;
  // } else {
  //   console.log("in else");
  //   tank.stop();
  //   plane.stop();
  //   plane.play();
  //   i = 1;
  // }
});

const xData = document.querySelector('#xData');
const yData = document.querySelector('#yData');
const zData = document.querySelector('#zData');
var visited = 1;
const nextB = document.getElementById("nextB");
const info = document.getElementById("info");
nextB.style.display = "none";

function handleOrientation(event) {
  var x = degreesToRadians(event.beta);
  var y = degreesToRadians(event.gamma);
  var z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);
  // xData.textContent = "x: " + event.beta;
  // yData.textContent = "y: " + event.gamma;
  // zData.textContent = "z: " + event.alpha;
  if (visited == 1) {
    if (event.alpha > 160 && event.alpha < 200) {
      visited = 2;
      party.play();
      mission1Completed();
    }
  }
  else if (visited == 3) {
    if (event.alpha > 60 && event.alpha < 100) {
      visited = 4;
      party.play();
      mission2Completed();
    }
  }

}

function mission1Completed() {
  changeImage("img/invisible.png");
  nextB.style.display = "block";
  typewriter.deleteAll(0.2);
  typewriter.typeString('')
  .start();
  bigTypeWriter.deleteAll(0.2);
  bigTypeWriter.typeString('Good Job!')
  .start();
  typewriter.typeString('')
  start();
}

function mission2Completed() {
  changeImage("img/invisible.png");
  nextB.style.display = "block";
  typewriter.deleteAll(0.2);
  typewriter.typeString('')
  .start();
  bigTypeWriter.deleteAll(0.2);
  bigTypeWriter.typeString('Quack!')
  .start();
  typewriter.typeString('You can navigate to objects by follow their sound')
  start();
}
nextB.addEventListener('click', () => {
  if(visited == 2){
  quack.play();
  nextB.style.display = "none";
  changeImage("img/soundDone.png");
  typewriter.deleteAll(0.2);
  bigTypeWriter.deleteAll(0.2);
  typewriter.typeString('Move your phone to the direction that the sound is coming from.')
  .start();
  bigTypeWriter.typeString('Sound')
  .start();
  visited = 3;
  }
  else if(visited == 4){
    quack.stop();
    visited = 5;
    nextB.style.display = "block";
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('You can now explore the area on your own')
    .start();
    bigTypeWriter.typeString('Done')
    .start();
  }else if(visited == 5){
    visited = 6;
    nextB.style.display = "none";
    info.style.display = "none";
  }
});

function changeImage(a) {
       document.getElementById("img").src=a;
}

window.addEventListener('deviceorientation', handleOrientation);

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Geolocation / distance
window.addEventListener('DOMContentLoaded', geoFindMe);
const tankLat = 59.574560;
const tankLong = 17.840493;
const planeLat = 59.574063;
const planeLong = 17.840166;
const status = document.querySelector('#status');
const distance = document.querySelector('#distance');
const mapLink = document.querySelector('#map-link');
const planeStatus = document.querySelector('#plane');
const tankStatus = document.querySelector('#tank');

function geoFindMe() {
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
    // tankStatus.textContent = '';
    // tankStatus.textContent ='tank vol: ' + tankV;


    planeV = regulateVolume(planeDistance);
    // planeStatus.textContent = '';
    // planeStatus.textContent ='plane vol: ' + planeV;
    tank.volume(tankV);
    plane.volume(planeV);
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

function regulateVolume(dist) {

  var v;
  // distance.textContent = '';
  // distance.textContent +='dist: ' + dist;

  if (dist > 100) {
    // distance.textContent += 'dist > 100';
    v = 0.1;
  } else if (dist < 0) {
    // distance.textContent += 'dist < 0';
    v = 1;
  } else {
    // distance.textContent += 'else:';
    v = 1 - (dist / 100);
    // distance.textContent +='vol set to:' + v;
  }
  return v;
}

var infoText = document.getElementById('infoText');
var bigText = document.getElementById('big-txt');


var typewriter = new Typewriter(infoText, {
  loop: false,
  delay: 0.2,
  cursor: ''
});

var bigTypeWriter = new Typewriter(bigText, {
  loop: false,
  delay: 0.2,
  cursor: ''
});

typewriter.typeString('Move the camera to find the balloon.')
.start();
bigTypeWriter.typeString('Rotate')
.start();
