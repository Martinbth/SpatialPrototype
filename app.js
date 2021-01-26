
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
  src: ['./sounds/radioMorse.mp3'],
  loop: true,
  autoplay: false,
  // html5: true,
  volume: 1,
});

var cannon = new Howl({
  src: ['./sounds/gun.mp3'],
  loop: true,
  autoplay: false,
    // html5: true,
  volume: 1,
});

var airplane = new Howl({
  src: ['./sounds/plane.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});
// radio.play();
dog.pos(45, 0, 45);
radio.pos(45, 0, -45);
cannon.pos(0, 0, 0);
airplane.pos(-50, 0, 0);

var visited = 1;
const nextB = document.getElementById("nextB");
const info = document.getElementById("info");
const status = document.getElementById("status");
nextB.style.display = "none";
nextB.innerText = 'Next';

function handleOrientation(event) {
  var x = degreesToRadians(event.beta);
  var y = degreesToRadians(event.gamma);
  var z = degreesToRadians(event.alpha);
  Howler.orientation(Math.sin(z), 0, Math.cos(z), 0, 1, 0);
  if (visited == 1) {
    if (event.alpha > 170 && event.alpha < 250) {
      visited++;
      party.play();
      mission1Completed();
    }
  }
  else if (visited == 3) {
    if (event.alpha > 0 && event.alpha < 60) {
      visited++;
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
  nextB.innerText = 'lets go';
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
  visited++;
  dog.play();
  nextB.style.display = "none";
  changeImage("img/soundDone.png");
  typewriter.deleteAll(0.2);
  bigTypeWriter.deleteAll(0.2);
  typewriter.typeString('Move your phone to the direction that the sound is coming from.')
  .start();
  bigTypeWriter.typeString('Sound')
  .start();
  }

  else if(visited == 4){
    visited++;
    dog.stop();
    nextB.style.display = "block";
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('You can now explore the area on your own')
    .start();
    bigTypeWriter.typeString('Done')
    .start();
    nextB.innerText = 'Done';
  }else if(visited == 5){
    visited++;
    radio.play();
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('')
    .start();
    bigTypeWriter.typeString('')
    .start();
    info.style.backgroundColor = "transparent";
    nextB.innerText = 'New poi';
    nextB.style.display = "none";
  }
  else if(visited==6){
    nextB.style.display = "none";
    radio.stop();
    cannon.play();
    visited++;
  }
  else if(visited == 7){
    cannon.stop();
    airplane.play();
    nextB.innerText = 'Completed!';
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
  var latitude1 = 59.574380;
  var longitude1 = 17.840580;
  //dog
  var latitude2 = 59.574560;
  var longitude2 = 17.839984;
  //radio
  var latitude3 = 59.573766;
  var longitude3 = 17.839355;

  var radioScan = false;
  var gunScan = false;
  var planeScan = false;

  var visiting = 1;

  function success(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    radioDistance = calculateDistance(latitude1, longitude1, userLat, userLong);
    cannon2Distance = calculateDistance(latitude2, longitude2, userLat, userLong);
    planeDistance = calculateDistance(latitude3, longitude3, userLat, userLong);
    radioV = regulateVolume(radioDistance);
    // if(radioDistance > 0.9 && radioScan == true){
    //     nextB.style.display = "block";
    //     radioScan = false;
    //     gunScan = true;
    // }
    // else if( cannon2Distance > 0.9 && gunScan == true){
    //     nextB.style.display = "block";
    //     gunScan = false;
    //     planeScan = true;
    // }
    // else if(planeDistance > 0.9 && planeScan == true){
    //     nextB.style.display = "block";
    //     planeScan = false;
    // }
    
    cannon2V = regulateVolume(cannon2Distance);
    planeV = regulateVolume(planeDistance);
    radio.volume(radioV);
    cannon.volume(cannonV);
    airplane.volume(planeV);

    status.innerText = 'cannon: ' + cannon.volume() + '\bplane: ' + airplane.volume() + '\bradio: ' + radio.volume();
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
