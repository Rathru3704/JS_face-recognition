import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
// import Link from './components/Link/Link';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navigation />
        {/* <Logo />
        <Link />
        <FaceRecognition />  */}
      </div>
    );
  }
}

export default App;
