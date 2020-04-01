import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LinkForm from './components/LinkForm/LinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import {createCanvas, loadImage, Image} from 'canvas';
import Script from 'react-load-script';
// import Canvas from './Canvas';




const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');
 
// Write "Awesome!"
ctx.font = '30px Impact';
ctx.rotate(0.1);
ctx.fillText('Awesome!', 50, 100);
 
// Draw line under text
var text = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + text.width, 102);
ctx.stroke();
 
// Draw cat with lime helmet
loadImage('./Silly-kitty-all-the-birds-went-south.jpg').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70);
 
  console.log('<img src="' + canvas.toDataURL() + '" />');
})








const particleConfig = {
  particles: {
    shape: {
      type: 'images',
      images: [
        {src: './paw-solid.svg', height: 20, width: 20},
      ],
      storke: {
        width: 3,
        color: '#F6FFFE',
      }
    },
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imgUrl: '',
    }
  }

  onChange = (event) => {
    this.setState({input: event.target.value});
  }

  onClick = () => {
    this.setState({imgUrl: this.state.input});

    var cats = window.kittydar.detectCats(canvas);
    console.log("there are", cats.length, "cats in this photo");
    console.log(cats[0]);
  }
  
  render(){
    return (
      <div className="App">
        {/* <Test /> */}
        <Navigation />
        <Logo />
        <Script url="https://github.s3.amazonaws.com/downloads/harthur/kittydar/kittydar-0.1.0.min.js" />
        <LinkForm onChange={this.onChange} onClick={this.onClick} />
        <FaceRecognition imgUrl={this.state.imgUrl}/>
        {/* <Canvas /> */}
        <Particles className='particles' params={particleConfig} />
      </div>
    );
  }
}

export default App;
