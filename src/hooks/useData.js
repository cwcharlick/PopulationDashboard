// import { useState, useEffect } from 'react';
// import { csv } from 'd3';

// export const useData = (csvUrl) => {
//   // yScale allows me to scale figures if the dataset's unit !== 1
//   // eg population data set in 1000s (1000 actually means 1,000,000)

//   const [data, setData] = useState(undefined);

//   useEffect(() => {
//     csv(csvUrl).then((data) => {

//       setData(data);
//     });
//   }, [csvUrl]);

//   return data;
// };
