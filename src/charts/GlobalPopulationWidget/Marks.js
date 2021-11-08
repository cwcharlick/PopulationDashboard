
import React, { useContext } from 'react';
import { YearContext } from '../../year';

export const Marks = ({
  yScale,
  xScale,
  innerHeight,
  data,
}) => {
  
  const [year, setYear] = useContext(YearContext);
  return data.map((d) => 
    {
    return <g
      key={d.Year}
      transform={`translate(${xScale(d.Year)},0)`}
      className="tick"
      onMouseEnter={()=>setYear({selected: year.selected, hover: d.Year})}
      onMouseLeave={()=>setYear({selected: year.selected, hover: year.selected})}
      onClick={()=>setYear({selected: d.Year, hover: d.Year})}
    >
     
      <rect
        x="0"
        y={innerHeight / 2}
        transform={`translate(0,-${Math.floor(yScale(d.Population)) / 2})`}
        width={(xScale.bandwidth() + 1)}
        height={Math.floor(yScale(d.Population))}
        className={d.Year === year.selected || d.Year === year.hover ? "mark selected" : "mark"}
      />
    </g>;}
  );
};
