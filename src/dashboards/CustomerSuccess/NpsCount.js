import { arc } from 'd3';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const NpsCount = () => {
  const { setToolTip } = useContext(AppContext);

  const width = 300;
  const height = 300;
  const goal = [30, 50];
  const range = [-100, 100];
  const scale = 0.8;
  const maxAngle = 2 * Math.PI * scale;

  const goalStartAngle = calcAngle(range, scale, goal[0]);
  const goalEndAngle = calcAngle(range, scale, goal[1]);

  const lowMark = arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .startAngle(0)
    .endAngle(goalStartAngle);

  const targetMark = arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .startAngle(goalStartAngle)
    .endAngle(goalEndAngle);

  const highMark = arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .startAngle(goalEndAngle)
    .endAngle(maxAngle);

  const nps = 45;

  const toolTipContent = (
    <>
      <b style={{ color: '#E07A5F' }}>Low:</b> below {goal[0]}
      <br />
      <b style={{ color: '#81B29A' }}>Good:</b> between {goal[0]} &#038;{' '}
      {goal[1]}
      <br />
      <b style={{ color: '#F2CC8F' }}>High:</b> above {goal[1]}
      <br />
    </>
  );

  return (
    <svg
      width={width}
      height={height}
      onMouseOver={() => setToolTip({ title: 'NPS', content: toolTipContent })}
      onMouseLeave={() => setToolTip(undefined)}
    >
      <text
        transform={`translate(${width / 2}, ${30})`}
        fill="#36476c"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontWeight: 600,
          fontSize: '32px',
        }}
      >
        NPS
      </text>
      <g
        transform={`translate(${width / 2}, ${height / 2 + 30}) rotate(${
          (360 * (1 - scale)) / 2 - 180
        }) `}
      >
        <path d={lowMark()} fill="#E07A5F" />
        <path d={targetMark()} fill="#81B29A" />
        <path d={highMark()} fill="#F2CC8F" />
        <line
          y1="-60"
          y2="-140"
          stroke="#36476c"
          strokeWidth="3"
          transform={`rotate(${calcAngle(range, scale, nps, 'deg')})`}
        />
      </g>
      <text
        transform={`translate(${width / 2}, ${height / 2 + 30})`}
        fill="#36476c"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontWeight: 600,
          fontSize: '38px',
        }}
      >
        {nps}
      </text>
    </svg>
  );
};

function calcAngle(range, scale, value, unit = 'rad') {
  if (unit === 'rad')
    return ((value - range[0]) / (range[1] - range[0])) * scale * 2 * Math.PI;

  if (unit === 'deg')
    return ((value - range[0]) / (range[1] - range[0])) * scale * 360;
}
