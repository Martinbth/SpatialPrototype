window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    // document.querySelector('#loadModels').addEventListener("click", function() {
      //put all models locations in a vector
      // let places = staticLoadPlaces();
      render();
    // });



};
const balloonLat = 59.574467;
const balloonLong = 17.840332;

// const tankLat = 59.572636;
// const tankLong = 17.845729;
// const planeLat = 59.574581;
// const planeLong = 17.840469;
function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
              lat:59.574467,
              lng:17.840332,
                // decomment the following and add coordinates:
                // lat: <your-latitude>,
                // lng: <your-longitude>,
            },
        },
        // {
        //     name: 'Pokèmonn',
        //     location: {
        //       lat:59.574063,
        //       lng:17.840166,
        //         // decomment the following and add coordinates:
        //         // lat: <your-latitude>,
        //         // lng: <your-longitude>,
        //     },
        // },
    ];
}

var models = [
  {
      url: './assets/balloon/scene.gltf',
      scale: '0.05 0.05 0.05',
      info: 'Good Job!',
      rotation: '0 0 0',
      position:'0 0 0',

  },
  {
      url: './assets/dog4/scene.gltf',
      scale: '10 10 10',
      info: 'Good Job!',
      rotation: '0 220 0',
      position:'0 -80 0',

  },
  {
      url: './assets/plane/scene.gltf',
      scale: '0.5 0.5 0.5',
      info: 'Good Job!',
      rotation: '0 180 0',
      position:'0 200 0',

  },
  // {
  //     url: './assets/dog2/scene.gltf',
  //     scale: '0.5 0.5 0.5',
  //     info: 'Nice worky',
  //     rotation: '0 180 0',
  // },
  //
  //   {
  //       url: './assets/magnemite/scene.gltf',
  //       scale: '0.5 0.5 0.5',
  //       info: 'Magnemite, Lv. 5, HP 10/10',
  //       rotation: '0 180 0',
  //   },
    // {
    //     url: './assets/articuno/scene.gltf',
    //     scale: '0.1 0.1 0.1',
    //     info: 'Articuno, Lv. 80, HP 100/100',
    //     rotation: '0 180 0',
    // },
    // {
    //     url: './assets/dragonite/scene.gltf',
    //     scale: '0.03 0.03 0.03',
    //     info: 'Duck',
    //     rotation: '0 180 0',
    // },


];

var modelIndex = 0;
var setModel = function (model, entity) {
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

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};




// var i=1;
// function renderPlaces(places) {
//     let scene = document.querySelector('a-scene'); //   <a-scene>
//     places.forEach((place) => {
//         let latitude = place.location.lat;
//         let longitude = place.location.lng;
//         let latitude2 = 59.572636;
//         let longitude2 = 17.845729;
//           let model = document.createElement('a-entity'); // <a-entity>
//         // model.setAttribute('gps-entity-place', '');
//         model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//         setModel(models[modelIndex], model);
//
//         model.setAttribute('animation-mixer', '');
//
//         document.querySelector('button[data-action="change"]').addEventListener('click', function () {
//             model.remove('a-entity');
//             let model = document.createElement('a-entity');
//
//             model.setAttribute('gps-entity-place', 'latitude:59.572636; longitude:17.845729;');
//             setModel(models[modelIndex], model);
//             modelIndex++;
//             var newIndex = modelIndex % models.length;
//             setModel(models[newIndex], entity);
//             scene.appendChild(entity);
//         });
//         scene.appendChild(model); // </a-entity></a-scene>
//     });
// }

function render(){
    let latitude1 = 59.574467;
    let longitude1 = 17.840332;
    let latitude2 = 59.572636;
    let longitude2 = 17.845729;
    let scene = document.querySelector('a-scene');
    let model = document.createElement('a-entity');
    model.setAttribute('gps-entity-place', `latitude: ${latitude1}; longitude: ${longitude1};`);
    setModel(models[0], model);
    model.setAttribute('animation-mixer', '');

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
    scene.removeChild(model);
    let model = document.createElement('a-entity');
    model.setAttribute('gps-entity-place', `latitude: ${latitude2}; longitude: ${longitude2};`);
    setModel(models[1], model);
    model.setAttribute('animation-mixer', '');
    scene.appendChild(model);
    });
    scene.appendChild(model); // </a-entity></a-scene>
}

// function renderPlaces(places) {
//     let scene = document.querySelector('a-scene'); //   <a-scene>
//
//     places.forEach((place) => {
//         let latitude = place.location.lat;
//         let longitude = place.location.lng;
//         let latitude2 = 59.572636;
//         let longitude2 = 17.845729;
//
//
//         let model = document.createElement('a-entity'); // <a-entity>
//         // model.setAttribute('gps-entity-place', '');
//         model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//         setModel(models[modelIndex], model);
//
//         model.setAttribute('animation-mixer', '');
//
//         document.querySelector('button[data-action="change"]').addEventListener('click', function () {
//             var entity = document.querySelector('[gps-entity-place]');
//
//             entity.setAttribute('gps-entity-place', 'latitude:59.572636; longitude:17.845729;');
//             modelIndex++;
//             var newIndex = modelIndex % models.length;
//             setModel(models[newIndex], entity);
//             scene.appendChild(entity);
//         });
//
//         scene.appendChild(model); // </a-entity></a-scene>
//     });
// }

// var i=1;
// function renderPlaces(places) {
//     let scene = document.querySelector('a-scene');
//
//     places.forEach((place) => {
//         let latitude = place.location.lat;
//         let longitude = place.location.lng;
//
//         let model = document.createElement('a-entity');
//         model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
//         setModel(models[modelIndex], model);
//
//         model.setAttribute('animation-mixer', '');
//
//         document.querySelector('button[data-action="change"]').addEventListener('click', function () {
//             var entity = document.querySelector('[gps-entity-place]');
//
//             modelIndex++;
//             var newIndex = modelIndex % models.length;
//             setModel(models[newIndex], entity);
//         });
//
//         scene.appendChild(model);
//     });
// }
