
// import * as app from './app.js';
window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');

  render();
};

//Hammarby sjöstad
// //Balloon
// let latitude1 = 59.304307;
// let longitude1 = 18.108125;
// //dog
// let latitude2 = 59.304635;
// let longitude2 = 18.107562;
// //radio
// let latitude3 = 59.304462;
// let longitude3 = 18.109537;
// //gun
// let latitude4 = 59.303394;
// let longitude4 = 18.108903;
// //plane
// let latitude5 = 59.303660;
// let longitude5 = 18.106692;

//Stugan
//Balloon
let latitude1 = 59.303213;
let longitude1 = 18.629632;
//dog
let latitude2 = 59.303452;
let longitude2 = 18.629391;
//radio
let latitude3 = 59.302677;
let longitude3 = 18.629949;
//gun
let latitude4 = 59.302255
let longitude4 = 18.629552;
//plane
let latitude5 = 59.302745;
let longitude5 = 18.629213;
let nrOfClicks = 0;
let modelNr = 0;
var modelIndex = 0;

var models = [
  {
    url: './assets/balloon/scene.gltf',
    scale: '0.05 0.05 0.05',
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
    scale: '0.15 0.15 0.15',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/gun/scene.gltf',
    scale: '0.11 0.11 0.11',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/plane/scene.gltf',
    scale: '0.4 0.4 0.4',
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
      if(localStorage.radio > 0.75 && modelNr == 0){
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
      if(localStorage.gun > 0.75 && modelNr == 1){
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
      if(localStorage.plane > 0.75 && modelNr == 2){
        try{
          setModel(models[4],model,latitude5,longitude5);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
  }, 2000);

  document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    nrOfClicks++;
    if (nrOfClicks == 1){
      try{
        setModel(models[0],model,latitude1,longitude1);
      }
      finally{
        setTimeout(() => {
          scene.appendChild(model);
        }, 3000);
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
        }, 3000);
      }
    }else if(nrOfClicks > 3){
      scene.removeChild(scene.lastChild);
      removeAttribute(model);
    }
  });
}
