export const Goal = ({ data }) => {
  if (!data) return;
  const { innerHeight, innerWidth, goal, setToolTipData, yScale } = data;

  return (
    <rect
      y={innerHeight / 2 - yScale(goal[1])}
      width={innerWidth}
      height={yScale(goal[1] - goal[0])}
      fill="rgba(129, 178, 154, 0.5)"
      className="hover-bright"
      onMouseOver={() =>
        setToolTipData({
          title: 'Healthy Score',
          content: (
            <>
              <b style={{ color: '#81B29A' }}>Good NPS:</b>{' '}
              {`between ${goal[0]} & ${goal[1]}`}
            </>
          ),
        })
      }
      onMouseLeave={() => setToolTipData(undefined)}
    />
  );
};
