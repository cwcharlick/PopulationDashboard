import { arc } from 'd3';
import { useContext, useMemo } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const ProgressPie = (props) => {
  const { setToolTip } = useContext(AppContext);

  const height = 300;
  const width = 300;

  const data = props.data;

  const {
    total,
    contacted,
    task,
    event,
    none,
    eventMark,
    taskMark,
    contactedMark,
    noneMark,
  } = useMemo(() => calculateArcs(data), [data]);

  const toolTipContent = (
    <>
      Events:<span className="accent">{event}</span>
      <br />
      Tasks: <span className="accent">{task}</span>
      <br />
      Contacted: <span className="accent">{contacted}</span>
      <br />
      No action: <span className="accent">{none}</span>
    </>
  );

  return (
    <svg
      height={height}
      width={width}
      onMouseOver={() =>
        setToolTip({
          title: 'Activity Progress',
          content: toolTipContent,
        })
      }
      onMouseOut={() => setToolTip(undefined)}
    >
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <path d={eventMark()} fill="#1cc691" />
        <path d={taskMark()} fill="#1cc691" />
        <path d={contactedMark()} fill="#445a7d" />
        <path d={noneMark()} fill="black" />
        <text
          textAnchor="middle"
          transform={`translate(0, 10)`}
          fill="#445a7d"
          style={{ fontWeight: 600 }}
        >
          {parseInt((100 / total) * (total - none))}%
        </text>
        <text
          textAnchor="middle"
          transform={`translate(0, -10)`}
          fill="#1cc691"
          style={{ fontWeight: 600 }}
        >
          {parseInt((100 / total) * (event + task))}%
        </text>
      </g>
    </svg>
  );
};

function calculateArcs(data) {
  console.log('called');
  const total = data.length;
  const contacted = data.filter(
    (account) => account.progress === 'contacted'
  ).length;
  const task = data.filter((account) => account.progress === 'task').length;
  const event = data.filter((account) => account.progress === 'event').length;
  const none = total - contacted - task - event;

  const unit = (Math.PI * 2) / total;

  let startAngle = 0;
  let endAngle = startAngle + unit * event;
  const eventMark = arc()
    .innerRadius(75)
    .outerRadius(125)
    .padAngle(0.02)
    .startAngle(startAngle)
    .endAngle(endAngle);

  startAngle = endAngle;
  endAngle = startAngle + unit * task;

  const taskMark = arc()
    .innerRadius(75)
    .outerRadius(125)
    .padAngle(0.02)
    .startAngle(startAngle)
    .endAngle(endAngle);

  startAngle = endAngle;
  endAngle = startAngle + unit * contacted;

  const contactedMark = arc()
    .innerRadius(90)
    .outerRadius(110)
    .padAngle(0.02)
    .startAngle(startAngle)
    .endAngle(endAngle);

  startAngle = endAngle;
  endAngle = startAngle + unit * none;

  const noneMark = arc()
    .innerRadius(98)
    .outerRadius(102)
    .padAngle(0.02)
    .startAngle(startAngle)
    .endAngle(endAngle);

  return {
    total,
    contacted,
    task,
    event,
    none,
    eventMark,
    taskMark,
    contactedMark,
    noneMark,
  };
}
