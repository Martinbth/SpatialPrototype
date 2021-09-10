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
  volume: 1,
});

var cannon = new Howl({
  src: ['./sounds/gun.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});

var airplane = new Howl({
  src: ['./sounds/plane.mp3'],
  loop: true,
  autoplay: false,
  volume: 1,
});

var visited = 0;
const nextB = document.getElementById("nextB");
const info = document.getElementById("info");
const status = document.getElementById("status");
nextB.style.display = "block";
nextB.innerText = 'Start';

// ++ -+
// +- --
dog.pos(45, 0, 45);
radio.pos(-80, 0, 30);
cannon.pos(5, 0, -40);
airplane.pos(40, 20, -5);

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

function mission1() {
  changeImage("img/rotateDone.png");
  nextB.style.display = "none";

  typewriter.deleteAll(0.2);
  typewriter.typeString('')
  .start();
  bigTypeWriter.deleteAll(0.2);
  bigTypeWriter.typeString('Find the ballon')
  .start();
  typewriter.typeString('Rotate the camera to find the balloon.').start();
}

function mission1Completed() {
  changeImage("img/invisible.png");
  nextB.style.display = "block";
  nextB.innerText = 'Next';
  typewriter.deleteAll(0.2);
  typewriter.typeString('')
  .start();
  bigTypeWriter.deleteAll(0.2);
  bigTypeWriter.typeString('You found it!')
  .start();
  typewriter.typeString('The camera works like a lense between the real world and present.').start();
}

function mission2Completed() {
  nextB.innerText = 'Got it';
  changeImage("img/invisible.png");
  nextB.style.display = "block";
  typewriter.deleteAll(0.2);
  typewriter.typeString('')
  .start();
  bigTypeWriter.deleteAll(0.2);
  bigTypeWriter.typeString('Woff!')
  .start();
  typewriter.typeString('You navigate to objects by following their sound').start();
}

nextB.addEventListener('click', () => {
  visited++;
  if(visited == 1){
  mission1();
  }else if(visited == 3){
  dog.play();
  nextB.style.display = "none";
  changeImage("img/soundDone.png");
  typewriter.deleteAll(0.2);
  bigTypeWriter.deleteAll(0.2);
  typewriter.typeString('Move your camera in the direction from where the sound is coming from').start();
  bigTypeWriter.typeString('Can you hear it?').start();
}else if(visited == 5){
    dog.stop();
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('You can now explore your surrounding on your own').start();
    bigTypeWriter.typeString('Done').start();
    nextB.innerText = 'Start explore';
  }else if(visited == 6){
    radio.play();
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('Follow the sound').start();
    bigTypeWriter.typeString('').start();
    info.style.backgroundColor = "transparent";
    nextB.innerText = 'Next object';
    nextB.style.display = "none";
  }else if(visited==7){
    radio.stop();
    cannon.play();
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('Follow the sound').start();
    bigTypeWriter.typeString('').start();
    nextB.style.display = "none";
    info.style.backgroundColor = "transparent";
  }else if(visited == 8){
    cannon.stop();
    airplane.play();
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('Follow the sound').start();
    bigTypeWriter.typeString('').start();
    nextB.style.display = "none";
    info.style.backgroundColor = "transparent";
  }else if(visited == 9){
    nextB.style.display = "none";
    airplane.stop();
    info.style.backgroundColor = "#082761";
    typewriter.deleteAll(0.2);
    bigTypeWriter.deleteAll(0.2);
    typewriter.typeString('Thanks for participating in this small tour, you can now give the phone to martin.').start();
    bigTypeWriter.typeString('Completed').start();
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

var userLat;
var userLong;
var cannon2Distance;
var planeDistance;
var cannon2V;
var planeV;
//radio
let latitude3 = 59.304462;
let longitude3 = 18.109537;
//gun
let latitude4 = 59.303394;
let longitude4 = 18.108903;
//plane
let latitude5 = 59.303660;
let longitude5 = 18.106692;

var radioScan = true;
var gunScan = false;
var planeScan = false;
var visiting = 1;
var countNR = 0;

function geoFindMe() {
  function success(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    countNR++;
    status.textContent = countNR;
    if(radioScan){
      radioDistance = calculateDistance(latitude3, longitude3, userLat, userLong);
      localStorage.radio = regulateVolume(radioDistance);
      radio.volume(localStorage.radio);

      if(localStorage.radio > 0.9){
          nextB.style.display = "block";
          info.style.backgroundColor = "#082761";
          typewriter.typeString('Radio receiver used in armored vehicles for communications with aircrafs during WWII').start();
          bigTypeWriter.typeString('Ukw.E.d1').start();
          radioScan = false;
          gunScan = true;
      }
    }
    else if(gunScan){
      cannon2Distance = calculateDistance(latitude4, longitude4, userLat, userLong);
      localStorage.gun = regulateVolume(cannon2Distance);
      cannon.volume(localStorage.gun);

      if(localStorage.gun > 0.9){
        nextB.style.display = "block";
        info.style.backgroundColor = "#082761";
        typewriter.typeString('Swedish modified anti-aircraft machine gun based on the wildy used M1919 Browning during WWII').start();
        bigTypeWriter.typeString('Ksp m/42').start();
        gunScan = false;
        planeScan = true;
      }
    }
    else if(planeScan){
      planeDistance = calculateDistance(latitude5, longitude5, userLat, userLong);
      localStorage.plane = regulateVolume(planeDistance);
      airplane.volume(localStorage.plane);

      if(localStorage.plane > 0.9){
        nextB.style.display = "block";
        info.style.backgroundColor = "#082761";
        typewriter.typeString('Swedish single-engine fighter aircraft developed for the Swedish Air Force during WWII').start();
        bigTypeWriter.typeString('FFVS J 22').start();
        planeScan = false;
        radioScan = true;
      }
    }
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
  // status.innerText = dist;
  var v;
  if(dist > 90){
    v = 0.1
  }else{
    v = 1 - (dist / 100);
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

typewriter.typeString('Lets get you started into exploring the world of augmented reality')
.start();
bigTypeWriter.typeString('Hi!')
.start();
