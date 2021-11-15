import { scaleBand, scaleLinear } from 'd3';
import { useTopTen } from '../../../hooks/useTopTen';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import React, { useContext, useMemo } from 'react';
import { DashboardContext } from '../../../contexts/DashboardContext';

export const PopulationBarChart = ({ rawData }) => {
  const { year } = useContext(DashboardContext);

  const yColumn = year.hover ? `${year.hover}` : `${year.selected}`;
  const xColumn = 'Country';
  const xValue = useMemo(() => (d) => d[xColumn], [xColumn]);
  const yValue = useMemo(() => (d) => d[yColumn], [yColumn]);

  const data = useTopTen(rawData, yValue, yColumn);

  if (!data) return <pre>Loading...</pre>;

  data.length = 10;
  const yMax = data.reduce(
    (acc, d) => (parseInt(yValue(d)) > acc ? parseInt(yValue(d)) : acc),
    0
  );

  const width = 960;
  const height = 500;
  const margin = { top: 70, right: 50, bottom: 50, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear().domain([0, yMax]).range([0, innerHeight]);
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .padding(0.2);
  // domain: data space (min - max values)
  // range: screen space (pixels)

  return (
    <svg width={width} height={height} style={{ cursor: 'default' }}>
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        className="bar-chart"
      >
        <text
          x={innerWidth / 2}
          transform={`translate(0,${-margin.top / 4})`}
          textAnchor="middle"
          className="chart-title"
        >
          Most Populous Countries
        </text>
        <AxisLeft
          yScale={yScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
        />
        <Marks
          yValue={yValue}
          xValue={xValue}
          yScale={yScale}
          xScale={xScale}
          innerHeight={innerHeight}
          data={data}
        />
      </g>
    </svg>
  );
};
