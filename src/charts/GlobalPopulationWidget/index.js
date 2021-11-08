import { scaleBand, scaleLinear } from 'd3';
import { useGlobalPop } from '../../hooks/useGlobalPop';
import { Marks } from './Marks';
import React, { useContext } from 'react';
import { YearContext } from '../../year';


export const GlobalPopulationWidget = ({rawData}) => {

  const [year, setYear] = useContext(YearContext);

  const data = useGlobalPop(rawData);
  if (!data) return <pre>Loading...</pre>;



  const yMax = data.reduce(
    (acc, d) => (parseInt(d.Population) > acc ? parseInt(d.Population) : acc),
    0
  );



  const width = 960;
  const height = 200;
  const margin = { top: 10, right: 50, bottom: 10, left: 50 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear().domain([0, yMax]).range([0, innerHeight]);
  const xScale = scaleBand()
    .domain(data.map(d => d.Year))
    .range([0, innerWidth]);

  // domain: data space (min - max values)
  // range: screen space (pixels)

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
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
