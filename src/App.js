// import { PieChart } from './charts/PieChart';
import React, {useState, useEffect} from 'react';
import { YearProvider } from './year';
 import { PopulationBarChart } from './charts/PopulationBarChart/';
import { GlobalPopulationWidget } from './charts/GlobalPopulationWidget/';
import { csv } from 'd3';
import './App.css';

const csvUrl =
  'https://gist.githubusercontent.com/cwcharlick/a2763cf244996e42efbb651a1918f539/raw/ed1ca5e40a639804018d4995a8e33c8da091d01c/WorldPopulation.csv';

function App() {

  const [rawData, setRawData] = useState()

  useEffect(() => {
    csv(csvUrl).then((data) => {
      // assign each country a random color
      data.forEach(d => d.color = Math.floor(Math.random()*16777215).toString(16))
      setRawData(data);
    });
  }, []);

  return <YearProvider><PopulationBarChart rawData={rawData} /><GlobalPopulationWidget rawData={rawData} /></YearProvider>;
}

export default App;
