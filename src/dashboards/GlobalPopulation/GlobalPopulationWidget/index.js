import { scaleBand, scaleLinear } from 'd3';
import { useGlobalPop } from '../../../hooks/useGlobalPop';
import { Marks } from './Marks';
import React from 'react';

export const GlobalPopulationWidget = ({ rawData }) => {
  const data = useGlobalPop(rawData);
  if (!data) return <pre>Loading...</pre>;

  const yMax = data.reduce(
    (acc, d) => (parseInt(d.Population) > acc ? parseInt(d.Population) : acc),
    0
  );

  const width = 960;
  const height = 200;
  const margin = { top: 30, right: 70, bottom: 30, left: 70 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear().domain([0, yMax]).range([0, innerHeight]);
  const xScale = scaleBand()
    .domain(data.map((d) => d.Year))
    .range([0, innerWidth])
    .round(true);

  // domain: data space (min - max values)
  // range: screen space (pixels)

  return (
    <svg width={width} height={height} className="widget">
      <g
        transform={`translate(50,${height / 2 - 32})`}
        dominantBaseline="center"
        className="widget-label"
      >
        <text>
          <tspan x="0" dy="1.4em" dominantBaseline="middle" textAnchor="middle">
            1950
          </tspan>
        </text>
      </g>
      <g
        transform={`translate(${width - 50},${height / 2 - 32})`}
        dominantBaseline="center"
        className="widget-label"
      >
        <text>
          <tspan x="0" dy="1.4em" dominantBaseline="middle" textAnchor="middle">
            2020
          </tspan>
        </text>
      </g>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Marks
          yScale={yScale}
          xScale={xScale}
          innerHeight={innerHeight}
          data={data}
        />
      </g>
    </svg>
  );
};
