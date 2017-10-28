import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import MapToolbar from './MapToolbar';
import Map from './Map';


class App extends Component {
  constructor(props) {
    super(props);
    this.onPathCreated = this.onPathCreated.bind(this);
    this.onPathDeleted = this.onPathDeleted.bind(this);
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

  onPathDeleted(path) {
    const newPaths = _.filter(this.state.paths, statePath => path.id !== statePath.id);
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
          onPathDeleted={this.onPathDeleted}
          activeQuality={this.state.activeQuality}
        />
        <MapToolbar className="map-toolbar" onQualityChange={this.onQualityChange} activeQuality={this.state.activeQuality} />
      </div>
    );
  }
}

export default App;
