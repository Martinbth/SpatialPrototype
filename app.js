var party = new Howl({
  src: ['./sounds/partyblow.mp3'],
  autoplay: false,
  loop: false,
  volume: 0.1,
});

var dog = new Howl({
  src: ['./sounds/dog.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});

var radio = new Howl({
  src: ['./sounds/radio.wav'],
  loop: true,
  autoplay: false,
  volume: 1,
});

var cannon = new Howl({
  src: ['./sounds/cannon2.wav'],
  loop: true,
  autoplay: false,
  volume: 0.2,
});

var airplane = new Howl({
  src: ['./sounds/airplane.mp3'],
  loop: true,
  autoplay: false,
  volume: 0.2,
});

dog.pos(10, 0, -60);
radio.pos(4, 4, 0);
cannon.pos(20, -70, 0);
airplane.pos(20, -70, 0);

var visited = 1;
const nextB = document.getElementById("nextB");
const info = document.getElementById("info");
nextB.style.display = "none";
nextB.innerText = 'Next';

function handleOrientation(event) {
  var x = degreesToRadians(event.beta);
  var y = degreesToRadians(event.gamma);
  var z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);
  if (visited == 1) {
    if (event.alpha > 170 && event.alpha < 250) {
      visited = 2;
      party.play();
      mission1Completed();
    }
  }
  else if (visited == 3) {
    if (event.alpha > 0 && event.alpha < 60) {
      visited = 4;
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
  nextB.innerText = 'lets g2o';
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
  dog.play();
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
    dog.stop();
    cannon.play();
    visited = 5;
    nextB.style.display = "block";
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('You can now explore the area on your own')
    .start();
    bigTypeWriter.typeString('Done')
    .start();
    nextB.innerText = 'Done';
  }else if(visited == 5){
    visited = 6;
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('')
    .start();
    bigTypeWriter.typeString('')
    .start();
    info.style.backgroundColor = "transparent";
    nextB.innerText = 'Byt';
    nextB.style.display = "block";
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
// const cannon2Lat = 59.574560;
// const cannon2Long = 17.840493;
// const planeLat = 59.574063;
// const planeLong = 17.840166;

function geoFindMe() {
  var userLat;
  var userLong;
  var cannon2Distance;
  var planeDistance;
  var cannon2V;
  var planeV;

  function success(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    // status.textContent = 'success';
    // status.textContent = '';
    cannon2Distance = calculateDistance(latitude1, longitude1, userLat, userLong);
    planeDistance = calculateDistance(latitude2, longitude1, userLat, userLong);
    cannon2V = regulateVolume(cannon2Distance);
    planeV = regulateVolume(planeDistance);
    cannon2.volume(cannon2V);
    plane.volume(planeV);
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
