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

var modelIndex = 0;
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

let nrOfClicks = 0;
function render(){
  let latitude1 = 59.574467;
  let longitude1 = 17.840332;
  let latitude2 = 59.574628;
  let longitude2 = 17.840424;
  let latitude3 = 59.574568;
  let longitude3 = 17.840043;
  let latitude4 = 59.574467;
  let longitude4 = 17.840332;
  let latitude5 = 59.574628;
  let longitude5 = 17.840424;
  let latitude6 = 59.574568;
  let longitude6 = 17.840043;
  let scene = document.querySelector('a-scene');
  let model0 = document.createElement('a-entity');
  let model1 = document.createElement('a-entity');
  let model2 = document.createElement('a-entity');
  let model3 = document.createElement('a-entity');
  let model4 = document.createElement('a-entity');

  setModel(models[0],model0,latitude1,longitude1);
  setModel(models[1],model1,latitude2,longitude2);
  setModel(models[2],model2,latitude3,longitude3);
  setModel(models[3],model3,latitude4,longitude4);
  setModel(models[4],model4,latitude5,longitude5);
  scene.appendChild(model0);
  document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    if(nrOfClicks == 0){
      scene.removeChild(scene.lastChild);
      nrOfClicks++;
      scene.appendChild(model1);
    }
    else if (nrOfClicks == 1){
      scene.removeChild(scene.lastChild);
      nrOfClicks++;
      scene.appendChild(model2);
    }
    else if (nrOfClicks == 2){
      scene.removeChild(scene.lastChild);
      nrOfClicks++;
      scene.appendChild(model3);
    }
    else if (nrOfClicks == 3){
      scene.removeChild(scene.lastChild);
      nrOfClicks=1;
      scene.appendChild(model4);
    }
  });
}
