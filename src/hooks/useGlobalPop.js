import { useState, useMemo } from 'react';

export const useGlobalPop = (rawData) => {
  // yScale allows me to scale figures if the dataset's unit !== 1
  // eg population data set in 1000s (1000 actually means 1,000,000)

  const [data, setData] = useState(undefined);

  useMemo(() => {

    if(!rawData) return;

    const firstYear = 1950;
    const lastYear = 2020;


      const globalPops = [];
      globalPops.columns=["Year", "Population"];

      for(let i = firstYear; i<= lastYear; i++){
        const population = rawData.reduce((acc, ele)=> acc += parseInt(ele[`${i}`]),0);
        globalPops.push({ "Year":i, "Population":population});
      }

      setData(globalPops);
    
  }, [rawData]);

  return data;
};
