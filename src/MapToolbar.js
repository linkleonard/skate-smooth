import React, { Component } from 'react';
import _ from 'lodash';
import { PathQuality } from './constants';

export default class MapToolbar extends Component {
  render() {
    return (
      <div>
        {_.map(PathQuality, quality => (
          <label key={quality.id}>
            <input type="radio" onChange={() => this.props.onQualityChange(quality.id)} checked={this.props.activeQuality === quality.id} />
            {quality.id + 1}
          </label>
        ))}
      </div>
    );
  }
}
