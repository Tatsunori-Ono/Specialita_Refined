// // StageサイズいっぱいにCanvasを配置する
// var canvasWrap = document.querySelector('#sp-stage-wrap');
// var canvas = document.querySelector('#canvas-container');
// var ctx = canvas.getContext('2d');
// canvas.setAttribute('width', canvasWrap.offsetWidth);
// canvas.setAttribute('height', canvasWrap.offsetHeight);

// // ランダムな方向に移動するパーティクル
// window.requestAnimFrame = (function () {
// return window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (callback) {
//         window.setTimeout(callback, 1000 / 60);
//     };
// })();
 
// window.onload = function() {
//     var canvasWrap = document.querySelector('#sp-stage-wrap');
//     var canvas = document.querySelector('#canvas-container');
//     var ctx = canvas.getContext('2d');
 
//     var center = {};    // Canvas中央
//     var dots = [];      // パーティクル配列
//     var density = 70;  //パーティクルの数
//     var colors = ['#eeb900', '#6DD0A5', '#f799db'];
//     var baseSize = 3;   // 大きさ
//     var baseSpeed = 10; // スピード
 
//     var Dot = function () {
//         this.size = Math.floor( Math.random() * 6 ) + baseSize; //大きさ
//         this.color = colors[~~(Math.random() * 3)]; //色
//         this.speed = this.size / baseSpeed; // 大きさによって速度変更
//         this.pos = {   // 位置
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height
//         };
//         var rot = Math.random() * 360;  // ランダムな角度
//         var angle = rot * Math.PI / 180;
 
//         this.vec = {    // 移動方向
//             x: Math.cos(angle) * this.speed,
//             y: Math.sin(angle) * this.speed
//         };
//     };
//     Dot.prototype = {
//         update: function() {
//             this.draw();
 
//             this.pos.x += this.vec.x;
//             this.pos.y += this.vec.y;
 
//             // 画面外に出たら反対へ再配置
//             if(this.pos.x > canvas.width + 10) {
//                 this.pos.x = -5;
//             } else if(this.pos.x < 0 - 10) {
//                 this.pos.x = canvas.width + 5;
//             } else if(this.pos.y > canvas.height + 10) {
//                 this.pos.y = -5;
//             } else if(this.pos.y < 0 - 10) {
//                 this.pos.y = canvas.height + 5;
//             }
//         },
 
//         draw: function() {
//             ctx.fillStyle = this.color;
//             ctx.beginPath();
//             ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
//             ctx.fill();
//         }
//     };
 
//     function update() {
//         requestAnimFrame(update);
//         // 描画をクリアー
//         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
 
//         for (var i = 0; i < density; i++) {
//             dots[i].update();
//         }
//     }
 
//     function init() {
//         // canvasにコンテンツサイズをセット
//         canvas.setAttribute("width", canvasWrap.offsetWidth);
//         canvas.setAttribute("height", canvasWrap.offsetHeight);
 
//         // canvas中央をセット
//         center.x = canvas.width / 2;
//         center.y = canvas.height / 2;
 
//         // densityの数だけパーティクルを生成
//         for (var i = 0; i < density; i++) {
//             dots.push(new Dot());
//         }
//         update();
//     }
//     init();
// }