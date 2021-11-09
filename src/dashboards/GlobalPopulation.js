// import { PieChart } from './charts/PieChart';
import React, { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '../contexts/dashboard';
import { PopulationBarChart } from '../charts/PopulationBarChart';
import { GlobalPopulationWidget } from '../charts/GlobalPopulationWidget';
import { YoyKPI } from '../charts/YoyKPI';
import { TotalGrowthKPI } from '../charts/TotalGrowthKPI';
import { TopPerformerKPI } from '../charts/TopPerformerKPI';
import { csv } from 'd3';
import { ToolTip } from '../utils/ToolTip';

const csvUrl =
  'https://gist.githubusercontent.com/cwcharlick/a2763cf244996e42efbb651a1918f539/raw/ed1ca5e40a639804018d4995a8e33c8da091d01c/WorldPopulation.csv';

export const GlobalPopulation = ()=> {
  const [rawData, setRawData] = useState();
  const {year, toolTip} = useContext(DashboardContext);
  const [toolTipLocation, setToolTipLocation ] = useState(0,0);

  onmousemove = (e)=>{setToolTipLocation({x: e.clientX, y: e.clientY})}

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    csv(csvUrl).then((data) => {
      // assign each country a random color
      data.forEach(
        (d) => (d.color = Math.floor(Math.random() * 16777215).toString(16))
      );
      setRawData(data);
    });
  }, []);

  const showToolTip = toolTip ? <ToolTip title={toolTip.title} left={toolTipLocation.x} top={toolTipLocation.y}>{toolTip.content}</ToolTip> : "";
  console.log(toolTip);

  return (<>
  <div className="zoom"><input type="range" max="1" min="0.5" step="0.05" value={zoom} onChange={(e)=>setZoom(e.target.value)}></input></div>
    <div className="dashboard" style={{transform: `scale(${zoom})`, transformOrigin:"top left"}}>
      <h1>Global Population: {year.hover || year.selected}</h1>
      <YoyKPI rawData={rawData}/>
      <TotalGrowthKPI rawData={rawData} />
      <TopPerformerKPI rawData={rawData} />
      <PopulationBarChart rawData={rawData} />
      <GlobalPopulationWidget rawData={rawData} />
    </div>
      {showToolTip}</>
  );
}

