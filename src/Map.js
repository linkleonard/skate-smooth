import React, { Component } from 'react';


export default class Map extends Component {
  componentDidMount() {
    const center = {lat: 40.720392, lng: -73.879629};
    const mapConfig = {zoom: 15, center};
    const map = new window.google.maps.Map(this.container, mapConfig);

    let savedPaths;

    try {
      savedPaths = JSON.parse(localStorage.getItem('paths'));
      if (savedPaths === null) {
        savedPaths = [];
      }
    } catch (exception) {
      savedPaths = [];
    }

    savedPaths.forEach(path => {
      const latLngs = path.map(point => new window.google.maps.LatLng(point));
      const drawOptions = {
        strokeColor: '#CC0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
      const prerenderedPolyline = new window.google.maps.Polyline({ ...drawOptions, path: latLngs });
      prerenderedPolyline.setMap(map);
    });

    const drawingOptions = {
      drawingMode: window.google.maps.drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
      },
    };
    const drawingManager = new window.google.maps.drawing.DrawingManager(drawingOptions);
    drawingManager.setMap(map);

    window.google.maps.event.addListener(drawingManager, 'polylinecomplete', (polyline) => {
      const path = [];
      polyline.getPath().forEach((point => path.push(point.toJSON())));
      savedPaths.push(path);

      localStorage.setItem('paths', JSON.stringify(savedPaths));
    })
  }

  render() {
    return (
      <div className="map" ref={container => this.container = container } />
    )
  }
}

