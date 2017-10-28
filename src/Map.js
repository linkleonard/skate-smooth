import React, { Component } from 'react';
import { PathQuality } from './constants';


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.drawPath = this.drawPath.bind(this);
    this.onPolylineCreated = this.onPolylineCreated.bind(this);
    this.getPolylineOptions = this.getPolylineOptions.bind(this);

    this.polylines = {};
    this.map = null;
    this.drawingManager = null;
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
      polylineOptions: this.getPolylineOptions(this.props.activeQuality)
    };
    this.drawingManager = new window.google.maps.drawing.DrawingManager(drawingOptions);
    this.drawingManager.setMap(this.map);

    window.google.maps.event.addListener(this.drawingManager, 'polylinecomplete', this.onPolylineCreated);
  }

  getPolylineOptions(quality) {
    return {
      strokeColor: PathQuality[quality].color,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.paths.forEach(path => {
      if (this.polylines[path.id] === undefined) {
        this.drawPath(path);
      }
    })

    if (prevProps.activeQuality !== this.props.activeQuality) {
      this.drawingManager.setOptions({
        polylineOptions: this.getPolylineOptions(this.props.activeQuality),
      });
    }
  }

  drawPath(path) {
    const latLngs = path.points.map(point => new window.google.maps.LatLng(...point));
    const quality = PathQuality[path.quality];
    const drawOptions = {
      strokeColor: quality !== undefined ? quality.color : '#CC0000',
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
      quality: this.props.activeQuality,
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

