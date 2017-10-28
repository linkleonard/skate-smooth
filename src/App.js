import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Skate Smooth</h3>
        <Map />
      </div>
    );
  }
}

export default App;
