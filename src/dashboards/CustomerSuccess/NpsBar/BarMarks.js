export const BarMarks = ({ data }) => {
  const {
    monthsData,
    setToolTipData,
    innerHeight,
    xScale,
    yScale,
    linePoints,
  } = data;

  return monthsData.map((d) => (
    <g
      key={d.month}
      transform={`translate(${xScale(d.month)},0)`}
      className="tick bar hover-bright"
      onMouseOver={() =>
        setToolTipData({
          title: d.month,
          content: barToolTip({
            promoter: d.promoter,
            detractor: d.detractor,
          }),
        })
      }
      onMouseLeave={() => setToolTipData(undefined)}
    >
      <rect
        x="0"
        y={innerHeight / 2 - Math.floor(yScale(parseInt(d.promoter)))}
        width={xScale.bandwidth()}
        height={Math.floor(yScale(parseInt(d.promoter)))}
        stroke="rgba(207, 233, 255, 0)"
        strokeWidth="4"
        style={{
          fill: '#F2CC8F',
          paintOrder: 'stroke',
        }}
      />
      <rect
        x="0"
        y={innerHeight / 2}
        width={xScale.bandwidth()}
        height={Math.floor(yScale(parseInt(d.detractor)))}
        style={{ fill: '#E07A5F' }}
      />
      {d.promoter &&
        linePoints.push({
          x: xScale.bandwidth() / 2 + xScale(d.month),
          y:
            innerHeight / 2 -
            Math.floor(yScale(parseInt(d.promoter))) +
            Math.floor(yScale(parseInt(d.detractor))),
        })}
    </g>
  ));
};

function barToolTip(toolTipData) {
  return (
    <>
      <b style={{ color: '#36476c' }}>NPS:</b>{' '}
      {toolTipData.promoter - toolTipData.detractor}
      <br />
      <b style={{ color: '#F2CC8F' }}>Promoter:</b> {toolTipData.promoter}%
      <br />
      <b style={{ color: '#E07A5F' }}>Detractor:</b> {toolTipData.detractor}
      %
      <br />
    </>
  );
}
