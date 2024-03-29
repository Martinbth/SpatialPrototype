
// import * as app from './app.js';
window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  render();
};
const status2 = document.getElementById("status");
//Hammarby sjöstad
//Balloon
// let latitude1 = 59.304177;
// let longitude1 = 18.107556;
// //dog
// let latitude2 = 59.304577;
// let longitude2 = 18.107299;
// //radio
// let latitude3 = 59.304002;
// let longitude3 = 18.107127;
// //gun
// let latitude4 = 59.303813;
// let longitude4 = 18.107690;
// //plane
// let latitude5 = 59.304002;
// let longitude5 = 18.107127;

//Balloon
let latitude1 = 59.304383;
let longitude1 = 18.109852;
//dog
let latitude2 = 59.304607;
let longitude2 = 18.109509;
//radio
let latitude3 = 59.303912;
let longitude3 = 18.110437;
//gun
let latitude4 = 59.303621;
let longitude4 = 18.110030;
//plane
let latitude5 = 59.304035;
let longitude5 = 18.108832;

//Stugan
// //Balloon
// let latitude1 = 59.310595;
// let longitude1 = 18.634996;
// //dog
// let latitude2 = 59.310861;
// let longitude2 = 18.634588;
// //radio
// let latitude3 = 59.310700;
// let longitude3 = 18.635742;
// //gun
// let latitude4 = 59.310511;
// let longitude4 = 18.635495;
// //plane
// let latitude5 = 59.310634;
// let longitude5 = 18.634846;

let nrOfClicks = 0;
let modelNr = 0;
var modelIndex = 0;

var models = [
  {
    url: './assets/balloon/scene.gltf',
    scale: '0.04 0.04 0.04',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/dog4/scene.gltf',
    scale: '10 10 10',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/radio/scene.gltf',
    scale: '0.1 0.1 0.1',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/gun/scene.gltf',
    scale: '0.05 0.05 0.05',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/plane/scene.gltf',
    scale: '0.2 0.2 0.2',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
];

function removeAttribute(entity){
  while(entity.attributes.length > 0){
    entity.removeAttribute(entity.attributes[0].name);
  }
}

var setModel = function (model,entity,lat,long) {
    entity.setAttribute('gps-entity-place', 'latitude:' + lat + '; longitude:' + long + ';');
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    if (model.position) {
        entity.setAttribute('position', model.position);
    }
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('animation-mixer', '');
};


function render() {
  //balloon
  const scene = document.querySelector('a-scene');
  var model = document.createElement('a-entity');

  setInterval(function() {
    if (nrOfClicks == 4){
      if(localStorage.radio > 0.8 && modelNr == 0){
        try{
          setModel(models[2],model,latitude3,longitude3);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
    //gun
    else if (nrOfClicks == 5){
      if(localStorage.gun > 0.8 && modelNr == 1){
        try{
          setModel(models[3],model,latitude4,longitude4);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
    //plane
    else if (nrOfClicks == 6){
      if(localStorage.plane > 0.8 && modelNr == 2){
        try{
          setModel(models[4],model,latitude5,longitude5);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
  }, 1000);

  document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    nrOfClicks++;
    if (nrOfClicks == 1){
      try{
        setModel(models[0],model,latitude1,longitude1);
      }
      finally{
        setTimeout(() => {
          scene.appendChild(model);
        }, 1000);
      }
    }else if(nrOfClicks == 2){
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[1],model,latitude2,longitude2);
      }
      finally{
        setTimeout(() => {
          scene.appendChild(model);
        }, 1000);
      }
    }else if(nrOfClicks > 3){
      scene.removeChild(scene.lastChild);
      removeAttribute(model);
    }
  });
}
