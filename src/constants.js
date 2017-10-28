import _ from 'lodash';

export const PathQuality = _.keyBy([
  {id: 0, color: '#81f25c'},
  {id: 1, color: '#c7f25c'},
  {id: 2, color: '#f2ef5c'},
  {id: 3, color: '#f2b35c'},
  {id: 4, color: '#f2665c'},
], 'id');
