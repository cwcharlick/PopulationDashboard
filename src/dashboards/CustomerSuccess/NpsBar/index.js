import { scaleLinear, scaleBand } from 'd3-scale';
import { line } from 'd3-shape';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';

import { Goal } from './Goal';
import { BarMarks } from './BarMarks';
import { MarkLine } from './MarkLine';

export const NpsBar = ({ data }) => {
  const { setToolTip } = useContext(AppContext);
  const [toolTipData, setToolTipData] = useState(undefined);
  useEffect(() => {
    if (!toolTipData) return setToolTip(undefined);
    setToolTip({
      title: toolTipData.title,
      content: toolTipData.content,
    });
  }, [toolTipData]);

  if (!data) return;

  const width = 960;
  const height = 500;
  const margin = { top: 120, right: 50, bottom: 0, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const goal = [30, 50];

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([0, innerHeight / 2]);
  const xScale = scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, innerWidth])
    .padding(0.5);

  const linePoints = [];
  const npsLine = line()
    .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
    .y((d) => innerHeight / 2 - yScale(d.promoter - d.detractor));

  const monthsData = [...data];
  monthsData.length = 11;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Goal
          data={{ innerHeight, innerWidth, goal, setToolTipData, yScale }}
        />
        <text
          x={innerWidth / 2}
          transform={`translate(0,${-margin.top / 4})`}
          textAnchor="middle"
          className="chart-title"
        >
          NPS: 2021
        </text>
        <BarMarks
          data={{
            monthsData,
            setToolTipData,
            innerHeight,
            xScale,
            yScale,
            linePoints,
          }}
        />
        <line
          x1="0"
          x2={innerWidth}
          y1={innerHeight / 2}
          y2={innerHeight / 2}
          stroke="white"
          strokeWidth="2"
        />{' '}
        <MarkLine data={{ linePoints, npsLine, monthsData }} />
      </g>
    </svg>
  );
};
