import React, { Component } from 'react';


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.drawPath = this.drawPath.bind(this);
    this.onPolylineCreated = this.onPolylineCreated.bind(this);

    this.polylines = {};
    this.map = null;
    this.nextPolylineId = 0;
  }

  componentDidMount() {
    const { paths } = this.props;

    const center = {lat: 40.720392, lng: -73.879629};
    const mapConfig = {zoom: 15, center};
    this.map = new window.google.maps.Map(this.container, mapConfig);

    paths.forEach(path => {
      this.polylines[path.id] = this.drawPath(path);
    });

    const drawingOptions = {
      drawingMode: window.google.maps.drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
      },
    };
    const drawingManager = new window.google.maps.drawing.DrawingManager(drawingOptions);
    drawingManager.setMap(this.map);

    window.google.maps.event.addListener(drawingManager, 'polylinecomplete', this.onPolylineCreated);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.paths.forEach(path => {
      if (this.polylines[path.id] === undefined) {
        this.polylines[path.id] = this.drawPath(path);
      }
    })
  }

  drawPath(path) {
    const latLngs = path.points.map(point => new window.google.maps.LatLng(...point));
      const drawOptions = {
        strokeColor: '#CC0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
      const prerenderedPolyline = new window.google.maps.Polyline({ ...drawOptions, path: latLngs });
      prerenderedPolyline.setMap(this.map);
  }

  onPolylineCreated(polyline) {
    const points = [];
    polyline.getPath().forEach(point => points.push([point.lat(), point.lng()]));

    const path = {
      id: this.nextPolylineId,
      points,
    };
    this.polylines[path.id] = polyline;

    ++this.nextPolylineId;
    this.props.onPathCreated(path);
  }

  render() {
    return (
      <div className="map" ref={container => this.container = container } />
    )
  }
}

