import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapToolbar from './MapToolbar';
import Map from './Map';


class App extends Component {
  constructor(props) {
    super(props);
    this.onPathCreated = this.onPathCreated.bind(this);
    this.onQualityChange = this.onQualityChange.bind(this);

    let savedPaths;

    try {
      savedPaths = JSON.parse(localStorage.getItem('paths'));
      if (savedPaths === null) {
        savedPaths = [];
      }
    } catch (exception) {
      savedPaths = [];
    }

    this.state = {
      activeQuality: 0,
      paths: savedPaths,
    }
  }

  onPathCreated(path) {
    const newPaths = [...this.state.paths, path];
    this.setState({
      paths: newPaths,
    })

    localStorage.setItem('paths', JSON.stringify(newPaths));
  }

  onQualityChange(level) {
    console.log(level);
    this.setState({activeQuality: level});
  }

  render() {
    return (
      <div className="App">
        <h3>Skate Smooth</h3>
        <Map
          paths={this.state.paths}
          onPathCreated={this.onPathCreated}
          activeQuality={this.state.activeQuality}
        />
        <MapToolbar onQualityChange={this.onQualityChange} activeQuality={this.state.activeQuality} />
      </div>
    );
  }
}

export default App;
