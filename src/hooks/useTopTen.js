import { useState, useEffect } from 'react';

export const useTopTen = (rawData, yValue) => {
  // yScale allows me to scale figures if the dataset's unit !== 1
  // eg population data set in 1000s (1000 actually means 1,000,000)

  const [data, setData] = useState(undefined);

  useEffect(() => {
      if(!rawData) return;
      rawData.sort((a, b) => yValue(b) - yValue(a));
      
      const topTen = [...rawData];
      topTen.length = 10;

      setData(topTen);
  
  }, [rawData, yValue]);

  return data;
};
