import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './modules/counter.js'
import { Canvas } from './modules/canvas.js';
import { Circle } from './modules/circle.js';
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
import randomSquare from './modules/square.js';
import * as GmsTest from './modules/gsmtest.js';
import { App } from './modules/app.js';
// // Load method categories.
// var array = require('lodash/array');
// var object = require('lodash/fp/object');

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// // create the canvas and reporting list
// let myCanvas = new Canvas('myCanvas', document.body, 480, 320);
// myCanvas.create();
// let reportList = myCanvas.createReportList();

// // draw a circle
// let circle1 = new Circle(myCanvas.ctx, myCanvas.listId, 75, 200, 100, 'green');
// circle1.draw();
// circle1.reportArea();
// circle1.reportPerimeter();

// let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
// reportArea(square1.length, reportList);
// reportPerimeter(square1.length, reportList);

// Use the default
// let square2 = randomSquare(myCanvas.ctx);

let app = new App();
let allDevices = await app.getAllDevices();

// let innerHtml = '<div class="wrapper">';
// for (const element of allDevices) {
//   innerHtml += `<li>${element.LedStatus} : ${element.stateTB?.dienap || "0.0"} : ${element.stateTB?.state || "off"}</li>`;
// };
// innerHtml.concat("</div>");
// console.log(innerHtml);

let innerHtml = app.buildInnerHtml(allDevices);
document.querySelector('#app').innerHTML = innerHtml;
