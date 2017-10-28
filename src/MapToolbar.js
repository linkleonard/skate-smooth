import React, { Component } from 'react';
import _ from 'lodash';
import { PathQuality } from './constants';

const styleByQuality = _.mapValues(PathQuality, pathQuality => ({
  background: pathQuality.color,
}))

export default class MapToolbar extends Component {
  render() {
    const { onQualityChange, activeQuality, ...props } = this.props;
    return (
      <div {...props}>
        <div className="toolbar-control">
          <label>Road Quality</label>
          <div className="toolbar-options">
            {_.map(PathQuality, quality => (
              <label key={quality.id} style={styleByQuality[quality.id]}>
                <input type="radio" onChange={() => onQualityChange(quality.id)} checked={activeQuality === quality.id} />
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
