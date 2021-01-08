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

let nrOfClicks = 0;
function render() {
  //balloon
  let latitude1 = 59.574348;
  let longitude1 = 17.840540;
  //dog
  let latitude2 = 59.574410;
  let longitude2 = 17.840326;
  //radio
  let latitude3 = 59.573894;
  let longitude3 = 17.839940;
  //gun
  let latitude4 = 59.574736;
  let longitude4 = 17.839720;
  //plane
  let latitude5 = 59.574935;
  let longitude5 = 17.84126;

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
