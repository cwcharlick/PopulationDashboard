// import { PieChart } from './charts/PieChart';
import React, { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '../../contexts/DashboardContext';
import { PopulationBarChart } from './PopulationBarChart';
import { GlobalPopulationWidget } from './GlobalPopulationWidget';
import { YoyKPI } from './YoyKPI';
import { TotalGrowthKPI } from './TotalGrowthKPI';
import { TopPerformerKPI } from './TopPerformerKPI';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/cwcharlick/a2763cf244996e42efbb651a1918f539/raw/ed1ca5e40a639804018d4995a8e33c8da091d01c/WorldPopulation.csv';

export const GlobalPopulation = () => {
  const [rawData, setRawData] = useState();
  const { year } = useContext(DashboardContext);

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

  return (
    <>
      <div className="zoom">
        <input
          type="range"
          max="1"
          min="0.5"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        ></input>
      </div>
      <div
        className="dashboard"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      >
        <h1>Global Population: {year.hover || year.selected}</h1>
        <YoyKPI rawData={rawData} />
        <TotalGrowthKPI rawData={rawData} />
        <TopPerformerKPI rawData={rawData} />
        <PopulationBarChart rawData={rawData} />
        <GlobalPopulationWidget rawData={rawData} />
      </div>
    </>
  );
};
