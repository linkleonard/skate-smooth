import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';


class App extends Component {
  constructor(props) {
    super(props);
    this.onPathCreated = this.onPathCreated.bind(this);

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

  render() {
    return (
      <div className="App">
        <h3>Skate Smooth</h3>
        <Map paths={this.state.paths} onPathCreated={this.onPathCreated} />
      </div>
    );
  }
}

export default App;
