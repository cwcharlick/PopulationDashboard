import { useState, useEffect } from 'react';
import { csv, arc } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/cwcharlick/5ce68d04b7cb470fe3e212b40bb21fcc/raw/01af1757cc22bdc7a5052f71ae2b582753d20da5/cssNamedColors.csv';

export const PieChart = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) return <pre>Loading...</pre>;

  const someArc = arc()
    .innerRadius(100)
    .outerRadius(200)
    .cornerRadius(7)
    .padAngle(0.02);

  data.length = 7;
  return (
    <svg width="960" height="500">
      <g transform={`translate(480, 250)`}>
        {data.map((color, i) => {
          const width = (Math.PI * 2) / data.length;
          return (
            <path
              d={someArc({
                startAngle: width * i,
                endAngle: width * i + width,
              })}
              key={color.Keyword}
              fill={color.Keyword}
            />
          );
        })}
        {/*pie()
              .value(1)(data)
              .map((d) => (
                <path d={someArc(d)} fill={d.data.Keyword} key={d.data.Keyword} />
              ))*/}
      </g>
    </svg>
  );
};
