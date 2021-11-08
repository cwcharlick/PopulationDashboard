import React, { useContext, useMemo } from 'react';
import { YearContext } from '../../year';
import { useGlobalPop } from '../../hooks/useGlobalPop';

export const YoyKPI = ({ rawData }) => {
  const [year] = useContext(YearContext);

  const displayYear = year.hover ? year.hover : year.selected;
  const prevYear = displayYear - 1;

  const data = useGlobalPop(rawData);

  if (!data) return <pre>Loading...</pre>;

  const kpiValue = (
    (100 / parseInt(data.find((y) => y.Year === prevYear).Population)) *
      parseInt(data.find((y) => y.Year === displayYear).Population) -
    100
  ).toPrecision(3);

  const width = 300;
  const height = 180;
  const margin = { top: 50, right: 20, bottom: 30, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // domain: data space (min - max values)
  // range: screen space (pixels)

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <text
          x={innerWidth / 2}
          transform={`translate(0,${-margin.top / 4})`}
          textAnchor="middle"
          className="chart-title"
        >
          YoY Global Growth
        </text>
        <text
          x={innerWidth / 2}
          y={innerHeight / 2 + margin.top / 2}
          transform={`translate(${-30},0)`}
          textAnchor="middle"
          className="kpi-figure"
        >
          {kpiValue + '%'}
        </text>

        <polygon
          points="20,0 40,20 0,20"
          transform={`translate(${innerWidth - margin.right - 50},${
            innerHeight / 2 - 5
          })`}
        />
      </g>
    </svg>
  );
};
