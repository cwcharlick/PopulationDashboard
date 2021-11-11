import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { DashboardContext } from '../../contexts/DashboardContext';
import { valueToLabel } from '../../utils/utils';

export const TopPerformerKPI = ({ rawData }) => {
  const { year } = useContext(DashboardContext);
  const { setToolTip } = useContext(AppContext);

  const displayYear = year.hover ? year.hover : year.selected;
  const prevYear = displayYear === 1950 ? 1950 : displayYear - 1;

  if (!rawData) return <pre>Loading...</pre>;
  const data = rawData;

  data.forEach(
    (d) =>
      (d.yoy = (100 / parseInt(d[prevYear])) * parseInt(d[displayYear]) - 100)
  );
  data.sort((a, b) => b.yoy - a.yoy);

  const kpiValue = data[0].Country;

  const valueFontSize = kpiValue.length > 8 ? 50 / (kpiValue.length / 8) : 50;

  const width = 300;
  const height = 180;
  const margin = { top: 50, right: 20, bottom: 30, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // domain: data space (min - max values)
  // range: screen space (pixels)

  const toolTipContent = (
    <>
      {displayYear} population:{' '}
      <span className="accent">
        {valueToLabel(parseInt(data[0][displayYear]))}
      </span>
      <br />
      Up by: <span className="accent">{data[0].yoy.toPrecision(3)}%</span>
    </>
  );

  return (
    <svg
      width={width}
      height={height}
      onMouseOver={() =>
        setToolTip({
          title: 'Top YoY Growth %',
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
          Top YoY Growth %
        </text>
        <text
          x={innerWidth / 2}
          y={innerHeight / 2 + valueFontSize / 2}
          transform={`translate(${-30},0)`}
          textAnchor="middle"
          className="kpi-figure"
          style={{ fontSize: `${valueFontSize}px` }}
        >
          {kpiValue}
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
