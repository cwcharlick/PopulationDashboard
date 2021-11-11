import { valueToLabel } from '../../utils/utils';

export const MarkValueLabel = ({ xScale, yScale, d, innerHeight, yValue }) => {
  return (
    <text
      className="mark-label"
      style={{
        textAnchor: 'middle',
      }}
      transform={`translate(${xScale.bandwidth() / 2}, -30)`}
      y={20 + innerHeight - Math.floor(yScale(parseInt(yValue(d))))}
    >
      {valueToLabel(parseInt(yValue(d)))}
    </text>
  );
};
