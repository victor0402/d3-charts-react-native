import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getScales, GRAPH_HEIGHT, GRAPH_WIDTH, DATA} from './utils';
import Svg, {G} from 'react-native-svg';
import DataGrid from './DataGrid';
import DataPointDot from './DataPointDot';

const SkittleChart: React.FC = () => {
  const {domain, scaleX, scaleY, scaleR, endDate, startDate} = getScales();

  const renderCircles = () => {
    return DATA.map((d, index) => (
      <DataPointDot
        key={index}
        strokeColor={'#1b1b9e'}
        fillColor={'#37409e'}
        x={scaleX(d.date)}
        y={scaleY(d.value)}
        r={scaleR(d.size)}
      />
    ));
  };

  const renderMinMaxLabels = () => {
    let [min, max] = domain.y;

    if (min === max) {
      const minDistance = 10;
      min -= minDistance;
      max += minDistance;
    }

    min = Math.max(Math.round(min), 0);
    max = Math.round(max);

    const [minText, maxText] = [min, max].map(value => {
      return `$ ${value}`;
    });

    return (
      <G x={8}>
        <G>
          <Text style={styles.minMaxLabel}>{maxText}</Text>
        </G>
        <G y={GRAPH_HEIGHT - 16}>
          <Text style={styles.minMaxLabel}>{minText}</Text>
        </G>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <DataGrid scaleX={scaleX} startDate={startDate} endDate={endDate} />
        {renderMinMaxLabels()}
        {renderCircles()}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT,
    marginTop: 36,
  },
  spinnerContainer: {
    justifyContent: 'center',
  },
  minMaxLabel: {
    fontSize: 10,
    color: '#ffffff',
  },
});

export default SkittleChart;
