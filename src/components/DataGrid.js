import React from 'react';
import {G, Line, Text} from 'react-native-svg';
import {getGridIntervals, GRAPH_HEIGHT} from './utils';

const GRID_LINES_WIDTH = 1;
const GRID_MARGIN_BOTTOM = 16;

const SVG_TEXT_STYLE = {
  color: '#ffffff',
  fontSize: 10,
};

const DataGrid: React.FC = props => {
  const intervals = getGridIntervals(
    props.startDate.getTime(),
    props.endDate.getTime(),
  );

  const lines = intervals.map(({value, year}, index) => {
    const x = props.scaleX(value);

    return (
      <G x={x} y={0} stroke={index} key={index}>
        <Line
          y2={GRAPH_HEIGHT - GRID_MARGIN_BOTTOM}
          stroke={'#bfacf1'}
          strokeWidth={GRID_LINES_WIDTH}
        />
        <Text
          fill={SVG_TEXT_STYLE.color}
          fontSize={SVG_TEXT_STYLE.fontSize}
          y={GRAPH_HEIGHT}>
          {year}
        </Text>
      </G>
    );
  });

  return <>{lines}</>;
};

export default DataGrid;
