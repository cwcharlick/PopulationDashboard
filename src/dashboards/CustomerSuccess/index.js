import { NpsCount } from './NpsCount';
import { NpsBar } from './NpsBar';
import { Grr } from './Grr';
import { Expansion } from './Expansion';

export const CustomerSuccess = () => {
  const data = fetchData();

  return (
    <>
      <h1>CS: November</h1>
      <Grr />
      <Expansion />
      <NpsCount />
      <br />
      <NpsBar data={data} />
    </>
  );
};

function fetchData() {
  // hardcoding some data to work with
  const data = [
    { month: 'Jan', promoter: 70, detractor: 10 },
    { month: 'Feb', promoter: 60, detractor: 20 },
    { month: 'Mar', promoter: 65, detractor: 20 },
    { month: 'Apr', promoter: 50, detractor: 10 },
    { month: 'May', promoter: 60, detractor: 10 },
    { month: 'Jun', promoter: 75, detractor: 5 },
    { month: 'Jul', promoter: 70, detractor: 5 },
    { month: 'Aug', promoter: 55, detractor: 10 },
    { month: 'Sep', promoter: 60, detractor: 15 },
    { month: 'Oct', promoter: 65, detractor: 10 },
    { month: 'Nov', promoter: 55, detractor: 10 },
    { month: 'Dec' },
  ];
  return data;
}
