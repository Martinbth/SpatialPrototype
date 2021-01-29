window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  render();
};

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
var modelIndex = 0;
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
let latitude1 = 59.571870;
let longitude1 = 17.856658;
//dog
let latitude2 = 59.572063;
let longitude2 = 17.856331;
//radio
let latitude3 = 59.571561;
let longitude3 = 17.855619;
//gun
let latitude4 = 59.573642;
let longitude4 = 17.855887;
//plane
let latitude5 = 59.575234;
let longitude5 = 17.857259;
let nrOfClicks = 0;
function render() {
  //balloon


  const scene = document.querySelector('a-scene');
  var model = document.createElement('a-entity');

  setModel(models[0],model,latitude1,longitude1);
  scene.appendChild(model);

  document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    if(nrOfClicks == 0){
      nrOfClicks++;
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[1],model,latitude2,longitude2);
      }
      finally{
        setTimeout(() => {    scene.appendChild(model); }, 5000);
      }
    }
    //radio
    else if (nrOfClicks == 1){
      nrOfClicks++;
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[2],model,latitude3,longitude3);
      }
      finally{
        scene.appendChild(model);
      }
    }
    //gun
    else if (nrOfClicks == 2){
      nrOfClicks++;
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[3],model,latitude4,longitude4);
      }
      finally{
        scene.appendChild(model);
      }
    }
    //plane
    else if (nrOfClicks == 3){
      nrOfClicks = 1;
      try{
        scene.removeChild(scene.lastChild);
        removeAttribute(model);
        setModel(models[4],model,latitude5,longitude5);
      }
      finally{
        scene.appendChild(model);
      }
    }
  });
}
