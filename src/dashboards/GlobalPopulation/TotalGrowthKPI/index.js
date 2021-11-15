import React, { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import { DashboardContext } from '../../../contexts/DashboardContext';
import { useGlobalPop } from '../../../hooks/useGlobalPop';
import { valueToLabel } from '../../../utils/utils';

export const TotalGrowthKPI = ({ rawData }) => {
  const { year } = useContext(DashboardContext);
  const { setToolTip } = useContext(AppContext);

  const displayYear = year.hover ? year.hover : year.selected;
  const prevYear = 1950;

  const data = useGlobalPop(rawData);

  if (!data) return <pre>Loading...</pre>;

  const currPop = data.find((y) => y.Year === displayYear).Population;
  const prevPop = data.find((y) => y.Year === prevYear).Population;

  const kpiValue = ((100 / prevPop) * currPop - 100).toPrecision(3);

  const width = 300;
  const height = 180;
  const margin = { top: 50, right: 20, bottom: 30, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const toolTipContent = (
    <>
      {displayYear} Population:{' '}
      <span className="accent">{valueToLabel(currPop)}</span>
      <br />
      Up by: <span className="accent">{valueToLabel(currPop - prevPop)}</span>
    </>
  );

  // domain: data space (min - max values)
  // range: screen space (pixels)

  return (
    <svg
      width={width}
      height={height}
      onMouseOver={() =>
        setToolTip({
          title: 'Growth from 1950',
          content: toolTipContent,
        })
      }
      onMouseOut={() => setToolTip(undefined)}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`} className="kpi">
        <text
          x={innerWidth / 2}
          transform={`translate(0,${-margin.top / 4})`}
          textAnchor="middle"
          className="chart-title"
        >
          Growth from 1950
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
