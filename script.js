
import * as app from './app.js';
window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  render();
};

//Balloon
let latitude1 = 59.574378;
let longitude1 = 17.840573;
//dog
let latitude2 = 59.574514;
let longitude2 = 17.840085;
//radio
let latitude3 = 59.574970;
let longitude3 = 17.841451;
//gun
let latitude4 = 59.573698;
let longitude4 = 17.841516;
//plane
let latitude5 = 59.573300;
let longitude5 = 17.839512;
let nrOfClicks = 0;
let modelNr = 0;
const info = document.getElementById("statusScript");
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
    scale: '0.4 0.4 0.4',
    info: 'Good Job!',
    rotation: '0 0 0',
  },
  {
    url: './assets/gun/scene.gltf',
    scale: '0.2 0.2 0.2',
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
    entity.setAttribute('gps-entity-place', 'latitude:' + lat + '; longitude:' + long + ';');  //Unsure
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
  setModel(models[0],model,latitude1,longitude1);
  scene.appendChild(model);

  setInterval(function() {
    statusScript.innerText = 'nrofclicls:' + nrOfClicks + 'modelNr: ' + modelNr + 'gun:' + localStorage.gun;
    // statusScript.innerText = 'modelNr: ' + modelNr + 'nrOfCLicks' + nrOfClicks;
    // statusScript.innerText = 'nr of clicks: ' + nrOfCLicks;
    if (nrOfClicks == 3){
      if(localStorage.radio > 0.6 && modelNr == 0){
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
    else if (nrOfClicks == 4){
      if(localStorage.gun > 0.6 && modelNr == 1){

        try{
          setModel(models[3],model,latitude3,longitude3);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
    //plane
    else if (nrOfClicks == 5){
      if(localStorage.plane > 0.6 && modelNr == 2){
        try{
          setModel(models[4],model,latitude3,longitude3);
        }
        finally{
          scene.appendChild(model);
          modelNr++;
        }
      }
    }
  }, 5000);

  document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    nrOfClicks++;
    if(nrOfClicks == 1){
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[1],model,latitude2,longitude2);
      }
      finally{
        setTimeout(() => {
          scene.appendChild(model);
         }, 5000);
      }
    }else if(nrOfClicks == 3){
      scene.removeChild(scene.lastChild);
      removeAttribute(model);
    }
    else if(nrOfClicks == 4){
      scene.removeChild(scene.lastChild);
      removeAttribute(model);
    }
    else if(nrOfClicks == 5){
      scene.removeChild(scene.lastChild);
      removeAttribute(model);
    }

    // else if (nrOfClicks == 3){
    //   scene.removeChild(scene.lastChild);
    //   removeAttribute(model);
    //   setModel(models[2],model,latitude3,longitude3);
    // }
    //
    // //gun
    // else if (nrOfClicks == 4){
    //   scene.removeChild(scene.lastChild);
    //   removeAttribute(model);
    //   while(modelNr != 3){
    //       if(localStorage.radio > 0.8){
    //         try{
    //           setModel(models[3],model,latitude3,longitude3);
    //         }
    //         finally{
    //           scene.appendChild(model);
    //           modelNr++;
    //         }
    //       }
    //   }
    // }
    // //plane
    // else if (nrOfClicks == 5){
    //   scene.removeChild(scene.lastChild);
    //   removeAttribute(model);
    //   while(modelNr != 4){
    //       if(localStorage.radio > 0.8){
    //         try{
    //           setModel(models[4],model,latitude3,longitude3);
    //         }
    //         finally{
    //           scene.appendChild(model);
    //           modelNr++;
    //         }
    //       }
    //   }
    // }
  });
}
// setInterval(function() {
//   statusScript.innerText = 'modelNr: ' + modelNr + 'nrOfCLicks' + nrOfClicks;
// }, 5000);
