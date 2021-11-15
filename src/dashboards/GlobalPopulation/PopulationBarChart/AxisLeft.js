import { valueToLabel } from '../../../utils/utils';

export const AxisLeft = ({ yScale, innerHeight, innerWidth }) => {
  return yScale.ticks().map((tickValue) => {
    const tickLabel = valueToLabel(tickValue);
    return (
      <g
        transform={`translate(0, ${
          innerHeight - Math.floor(yScale(tickValue)) + 0.5
        })`}
        key={tickValue}
        className="tick"
      >
        <line x2={innerWidth} />
        <text x="-5" y="3" style={{ textAnchor: 'end' }}>
          {tickLabel}
        </text>
      </g>
    );
  });
};
