export const MarkLine = ({ data }) => {
  const { linePoints, npsLine, monthsData } = data;
  return (
    <g>
      {linePoints.map((p, i) => {
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#36476c"
            style={{ pointerEvents: 'none' }}
          />
        );
      })}
      <path
        d={npsLine(monthsData)}
        fill="none"
        stroke="#36476c"
        strokeWidth="3"
        width="2"
        style={{ pointerEvents: 'none' }}
      />
    </g>
  );
};
