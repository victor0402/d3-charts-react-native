import {Dimensions} from 'react-native';
import {scaleLinear, scaleTime} from 'd3-scale';

export const GRAPH_WIDTH = Dimensions.get('window').width;
export const GRAPH_HEIGHT = 300;
export const PADDING_RIGHT = 32;
export const PADDING_VERTICAL = 16;
export const CIRCLE_MIN_SIZE = 8;
export const CIRCLE_MAX_SIZE = 32;

export const DATA = [
  {size: 10000, value: 63, date: new Date(2019, 5, 4).getTime()},
  {size: 45000, value: 78, date: new Date(2019, 7, 10).getTime()},
  {size: 20000, value: 65, date: new Date(2020, 2, 1).getTime()},
  {size: 30000, value: 70, date: new Date(2020, 5, 4).getTime()},
  {size: 40000, value: 54, date: new Date(2021, 5, 4).getTime()},
];

const startDate = new Date(2019, 2, 4);
const endDate = new Date(2021, 6, 11);

export const getGridIntervals = (start, end) => {
  const millisInMonth = 1000 * 3600 * 24 * 30;
  const monthsInYear = 12;

  const diff = Math.abs((end - start) / millisInMonth) + 1;
  const result = [];

  let year = new Date(start).getUTCFullYear();

  for (let i = 0; i < diff; i++) {
    const value = start + i * millisInMonth;
    const isFirstMonthOfYear = i % monthsInYear === 0;

    if (i > 0 && isFirstMonthOfYear) {
      year++;
    }

    result.push({
      value,
      year: isFirstMonthOfYear ? year : null,
    });
  }

  return result;
};

const getDomain = (domain, padding = 0) => {
  const min = Math.min(...domain) - padding;
  const max = Math.max(...domain) + padding;
  return [min, max];
};

export const getScales = () => {
  const domain = {
    x: [startDate.getTime(), endDate.getTime()],
    y: getDomain(
      DATA.map(d => d.value),
      8,
    ),
    r: getDomain(DATA.map(d => d.size)),
  };

  const scaleX = scaleTime()
    .domain(domain.x)
    .range([0, GRAPH_WIDTH - PADDING_RIGHT]);

  const scaleY = scaleLinear()
    .domain(domain.y)
    .range([GRAPH_HEIGHT - PADDING_VERTICAL, PADDING_VERTICAL]);

  const scaleR = scaleLinear()
    .domain(domain.r)
    .range([CIRCLE_MIN_SIZE, CIRCLE_MAX_SIZE]);

  return {
    startDate,
    endDate,
    domain,
    scaleX,
    scaleY,
    scaleR,
  };
};
