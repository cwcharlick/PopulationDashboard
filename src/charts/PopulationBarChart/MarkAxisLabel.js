export const MarkAxisLabel = ({ xScale, innerHeight, d, xValue }) => {
  return (
    <text
      style={{ textAnchor: 'middle' }}
      transform={`translate(${xScale.bandwidth() / 2},0)`}
      y={innerHeight + 20}
    >
      {xValue(d)}
    </text>
  );
};
