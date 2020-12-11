window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    // document.querySelector('#loadModels').addEventListener("click", function() {
      //put all models locations in a vector
      // let places = staticLoadPlaces();
      render();
    // });



};

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
      // position:'0 0 0',
  },
  {
      url: './assets/radio/scene.gltf',
      scale: '0.4 0.4 0.4',
      info: 'Good Job!',
      rotation: '0 0 0',
      // position:'0 4 0',

  },
  {
      url: './assets/dog4/scene.gltf',
      scale: '10 10 10',
      info: 'Good Job!',
      rotation: '0 0 0',
      // position:'0 40 0',
  },
  {
      url: './assets/plane/scene.gltf',
      scale: '0.4 0.4 0.4',
      info: 'Good Job!',
      rotation: '0 0 0',
      // position:'0 4 0',

  },
  {
      url: './assets/gun/scene.gltf',
      scale: '0.2 0.2 0.2',
      info: 'Good Job!',
      rotation: '0 0 0',
      // position:'0 4 0',

  },
  {
      url: './assets/truck/scene.gltf',
      scale: '0.15 0.15 0.15',
      info: 'Good Job!',
      rotation: '0 0 0',
      // position:'0 4 0',

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

// var modelIndex = 0;
// var setModel = function (model, entity, ) {
//     if (model.scale) {
//         entity.setAttribute('scale', model.scale);
//     }
//
//     if (model.rotation) {
//         entity.setAttribute('rotation', model.rotation);
//     }
//
//     if (model.position) {
//         entity.setAttribute('position', model.position);
//     }
//
//     entity.setAttribute('gltf-model', model.url);
//
//     const div = document.querySelector('.instructions');
//     div.innerText = model.info;
// };
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

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
    entity.setAttribute('animation-mixer', '');
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
    // let model = document.createElement('a-entity');
    // model.setAttribute('gps-entity-place', `latitude: ${latitude1}; longitude: ${longitude1};`);
    // setModel(models[0], model);
    // model.setAttribute('animation-mixer', '');

   let model0 = document.createElement('a-entity');
   let model1 = document.createElement('a-entity');
   let model2 = document.createElement('a-entity');
   let model3 = document.createElement('a-entity');
   let model4 = document.createElement('a-entity');
   let model5 = document.createElement('a-entity');


   setModel(models[0],model0,latitude1,longitude1);






   scene.appendChild(model0); // </a-entity></a-scene>
   document.querySelector('button[data-action="change"]').addEventListener('click', function () {

      if(nrOfClicks == 0){
        scene.removeChild(scene.lastChild);
           setModel(models[1],model1,latitude2,longitude2);
        nrOfClicks++;
        // let model0 = document.createElement('a-entity');
        // model0.setAttribute('gps-entity-place', `latitude: ${latitude2}; longitude: ${longitude2};`);
        // setModel(models[nrOfClicks], model0);
        // model0.setAttribute('animation-mixer', '');
        // const div = document.querySelector('.instructions');
        // div.innerText = "error";
        scene.appendChild(model1);
      }
      else if (nrOfClicks == 1){
        scene.removeChild(scene.lastChild);
        nrOfClicks++;
        setModel(models[2],model2,latitude3,longitude3);
        // let model1 = document.createElement('a-entity');
        //
        // model1.setAttribute('gps-entity-place', `latitude: ${latitude3}; longitude: ${longitude3};`);
        // setModel(models[nrOfClicks], model1);
        // model1.setAttribute('animation-mixer', '');
        scene.appendChild(model2);
      }
      else if (nrOfClicks == 2){
        scene.removeChild(scene.lastChild);
        nrOfClicks++;
           setModel(models[3],model3,latitude4,longitude4);
        scene.appendChild(model3);
      }
      else if (nrOfClicks == 3){
        scene.removeChild(scene.lastChild);
        nrOfClicks++;
           setModel(models[4],model4,latitude5,longitude5);
        scene.appendChild(model4);
      }
      else if (nrOfClicks == 4){
        scene.removeChild(scene.lastChild);
        nrOfClicks++;
           setModel(models[5],model5,latitude6,longitude6);
        scene.appendChild(model5);
      }

    });

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
