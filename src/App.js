import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import LinkForm from "./components/LinkForm/LinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
// import { createCanvas, loadImage, Image } from "canvas";
import Script from "react-load-script";
// import Canvas from './Canvas';

// const canvas = createCanvas(200, 200);
// const ctx = canvas.getContext("2d");

// // Write "Awesome!"
// ctx.font = "30px Impact";
// ctx.rotate(0.1);
// ctx.fillText("Awesome!", 50, 100);

// // Draw line under text
// var text = ctx.measureText("Awesome!");
// ctx.strokeStyle = "rgba(0,0,0,0.5)";
// ctx.beginPath();
// ctx.lineTo(50, 102);
// ctx.lineTo(50 + text.width, 102);
// ctx.stroke();

// Draw cat with lime helmet
// loadImage("./Silly-kitty-all-the-birds-went-south.jpg").then(image => {
//   ctx.drawImage(image, 50, 0, 70, 70);

//   console.log('<img src="' + canvas.toDataURL() + '" />');
// });

const particleConfig = {
  particles: {
    shape: {
      type: "images",
      images: [{ src: "./paw-solid.svg", height: 20, width: 20 }],
      storke: {
        width: 3,
        color: "#F6FFFE"
      }
    }
  }
};

const detector = {
  abortCurrent: function() {
    if (this.worker) {
      this.worker.terminate();
    }
  },

  detectCats: function() {
    // $("#progress").text("detecting cats...");

    var canvas = document.querySelector("#preview");

    if (window.Worker) {
      var worker = new Worker("/library/detection-worker.js");
      worker.onmessage = this.onMessage;
      worker.onerror = this.onError;

      var resizes = window.kittydar.getAllSizes(canvas);
      worker.postMessage(resizes);

      this.worker = worker;
    } else {
      var rects = window.kittydar.detectCats(canvas);
      this.paintCats(rects);
    }
  },

  paintCats: function(rects) {
    var noun = rects.length == 1 ? "cat" : "cats";
    console.log(rects.length + " " + noun + " detected");

    this.clearRects();
    this.paintRects(rects, "red");
  },

  clearRects: function() {
    var canvas = document.querySelector("#annotations");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  paintRects: function(rects, color) {
    var canvas = document.querySelector("#annotations");
    var ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.strokeStyle = color || "red";

    for (var i = 0; i < rects.length; i++) {
      var rect = rects[i];
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  },

  onMessage: function(event) {
    var data = event.data;
    console.log("onMessage", event);
    if (data.type === "progress") {
      detector.showProgress(data);
    } else if (data.type === "result") {
      detector.paintCats(data.cats);
    }
  },

  onError: function(event) {
    console.log("Error from detection Worker:", event.message);
  },

  showProgress: function(progress) {
    console.log("progress", progress);
    this.paintRects(progress.rects, "orange");
    // $("#progress").text("detecting at " + progress.size + "px...");
  }
};

class App extends Component {
  constructor() {
    super();
    this.img = new Image();
    this.state = {
      input: "",
      imgUrl: ""
    };
  }

  onChange = event => {
    this.setState({ input: event.target.value });
  };

  onClick = () => {
    this.setState({ imgUrl: this.state.input });
    // debugger;

    this.img.crossOrigin = "anonymous";

    this.img.onload = () => {
      this.detectImage(this.img);
    };

    this.img.src = this.state.input;

    // var cats = window.kittydar.detectCats(canvas);
    // console.log("there are", cats.length, "cats in this photo");
    // console.log(cats[0]);
  };

  drawToCanvas = img => {
    var width = img.width;
    var height = img.height;

    var max = Math.max(width, height);
    var scale = Math.min(max, 420) / max;

    width *= scale;
    height *= scale;

    let container = document.querySelector("#viewer-container");
    let viewer = document.querySelector("#viewer");
    container.width = width;
    container.height = height;
    viewer.width = width;
    viewer.height = height;

    var anno = document.querySelector("#annotations");
    anno.width = width;
    anno.height = height;

    let canvas = document.querySelector("#preview");
    canvas.width = width;
    canvas.height = height;

    console.log(img.width, img.height, canvas, anno);
    // draw image to preview canvas
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
  };

  detectImage = img => {
    this.drawToCanvas(img);
    detector.abortCurrent();
    detector.detectCats();
  };

  render() {
    return (
      <div className="App">
        {/* <Test /> */}
        <Navigation />
        <Logo />
        <Script url="/library/kittydar-0.1.0.min.js" />
        {/* /Silly-kitty-all-the-birds-went-south.jpg */}
        <LinkForm onChange={this.onChange} onClick={this.onClick} />
        <div id="viewer-container" >
          <div id="viewer" >
            <canvas id="preview"></canvas>
            <canvas id="annotations"></canvas>
          </div>
        </div>
        {/* <FaceRecognition /> */}
        {/* <Canvas /> */}
        <Particles className="particles" params={particleConfig} />
      </div>
    );
  }
}

export default App;
