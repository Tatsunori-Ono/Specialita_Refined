particlesJS('aura',{
    "particles":{
//--シェイプの設定----------
      "number":{
        "value":55,
        "density":{
          "enable":false
        }
      },
      "shape":{
        "type":"polygon",
        "stroke":{
          "width":3,
          "color":"#fff700"
        },
        "polygon": {
          "nb_sides":5
        }
      },
      "color":{
        "value":"#ffffff"
      },
      "opacity":{
        "value":0,
        "random":false,
        "anim":{
          "enable":false
        }
      },
      "size":{
        "value":1,
        "random":true,
        "anim":{
          "enable":false
        }
      },
//--------------------

//--線の設定----------
      "line_linked":{
        "enable":false
      },
//--------------------

//--動きの設定----------
      "move":{
        "speed":5,
        "straight":false,
        "direction":"top",
        "out_mode":"out"
      }
    },
//--------------------
//     "interactivity":{
//       "detect_on":"canvas",
//       "events":{
// //--マウスオーバー時の処理----------
//         "onhover":{
//           "enable":true,
//           "mode":"bubble"
//         },
// //--------------------

// //--クリック時の処理----------
//         "onclick":{
//           "enable":false
//         }
// //--------------------
//       },
//       "modes":{
// //--シェイプが膨らむ----------
//         "bubble":{
//           "distance":400,
//           "size":70,
//           "opacity":8,
//           "duration":2,
//           "speed":3
//         }
// //--------------------
//       }
//     },
    "retina_detect":true,
    "resize":true
  }
);