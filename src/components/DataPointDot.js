import React from 'react';
import {Circle} from 'react-native-svg';

const DataPointDot: React.FC = props => {
  const {strokeColor, fillColor, x, y, r} = props;

  return <Circle x={x} y={y} r={r} stroke={strokeColor} fill={fillColor} />;
};

export default DataPointDot;
