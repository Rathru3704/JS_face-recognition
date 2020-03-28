import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LinkForm from './components/LinkForm/LinkForm';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import canvas from 'canvas';
import kittydar from 'kittydar';

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
    }
  }

  onChange = (event) => {
    console.log(event.target.value);
  }

  onClick = () => {
    console.log('click');

    var cats = kittydar.detectCats(canvas);
    console.log("there are", cats.length, "cats in this photo");
    console.log(cats[0]);
  }

  render(){
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <LinkForm onChange={this.onChange} onClick={this.onClick} />
        {/* <FaceRecognition />  */}
        <Particles className='particles' params={particleConfig} />
      </div>
    );
  }
}

export default App;
