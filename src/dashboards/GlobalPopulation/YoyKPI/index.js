import React, { useContext } from 'react';
import { DashboardContext } from '../../../contexts/DashboardContext';
import { AppContext } from '../../../contexts/AppContext';
import { useGlobalPop } from '../../../hooks/useGlobalPop';
import { valueToLabel } from '../../../utils/utils';

export const YoyKPI = ({ rawData }) => {
  const { setToolTip } = useContext(AppContext);
  const { year } = useContext(DashboardContext);

  const displayYear = year.hover ? year.hover : year.selected;
  const prevYear = displayYear === 1950 ? 1950 : displayYear - 1;

  const data = useGlobalPop(rawData);

  if (!data) return <pre>Loading...</pre>;

  const prevPop = parseInt(data.find((y) => y.Year === prevYear).Population);
  const currPop = parseInt(data.find((y) => y.Year === displayYear).Population);

  const kpiValue = ((100 / prevPop) * currPop - 100).toPrecision(3);

  const width = 300;
  const height = 180;
  const margin = { top: 50, right: 20, bottom: 30, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // domain: data space (min - max values)
  // range: screen space (pixels)

  const toolTipContent = (
    <>
      {displayYear} Population:{' '}
      <span className="accent">{valueToLabel(currPop)}</span>
      <br />
      Up by: <span className="accent">{valueToLabel(currPop - prevPop)}</span>
    </>
  );

  return (
    <svg
      width={width}
      height={height}
      onMouseOver={() => {
        setToolTip({
          title: 'YoY Growth',
          content: toolTipContent,
        });
      }}
      onMouseOut={() => setToolTip(undefined)}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`} className="kpi">
        <text
          x={innerWidth / 2}
          transform={`translate(0,${-margin.top / 4})`}
          textAnchor="middle"
          className="chart-title"
        >
          YoY Growth
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
