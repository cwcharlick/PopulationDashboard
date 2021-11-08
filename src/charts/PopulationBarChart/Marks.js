import { MarkValueLabel } from './MarkValueLabel';
import { MarkAxisLabel } from './MarkAxisLabel';

export const Marks = ({
  yValue,
  xValue,
  yScale,
  xScale,
  innerHeight,
  data,
}) => {
  return data.map((d) => (
    <g
      key={d.Country}
      transform={`translate(${xScale(xValue(d))},0)`}
      className="tick"
    >
      <MarkAxisLabel
        xScale={xScale}
        innerHeight={innerHeight}
        d={d}
        xValue={xValue}
      />
      <rect
        x="0"
        y={innerHeight - Math.floor(yScale(parseInt(yValue(d))))}
        width={xScale.bandwidth()}
        height={Math.floor(yScale(parseInt(yValue(d))))}
        className="mark"
        style={{ fill: `#${d.color}` }}
      />
      <MarkValueLabel
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        d={d}
        innerHeight={innerHeight}
      />
    </g>
  ));
};