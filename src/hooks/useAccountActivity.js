// import { useState, useEffect, useMemo } from 'react';
// import { csv } from 'd3';

// const accountsUrl =
//   'https://gist.githubusercontent.com/cwcharlick/b8fc3a3737f4ac1ad5476719e57161c2/raw/ffb75e2b32380252e3a3b401cb482fcd5691afec/Accounts.csv';
// const activityUrl =
//   'https://gist.githubusercontent.com/cwcharlick/764c649a01c200d12e9a42effd88f1a3/raw/1e6632cb58a7a061238f62d2414562100acf47e1/Activity.csv';

// function stringToDate(str) {
//   const dateParts = str.split('/');
//   return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
// }

// export const useAccountActivity = () => {
//   const [data, setData] = useState(undefined);
//   const cleanedData = useMemo(() => {
//     async function fetchData() {
//       const accounts = await csv(accountsUrl);
//       const activities = await csv(activityUrl);

//       activities.forEach(
//         (activity) => (activity['Date'] = stringToDate(activity['Date']))
//       );

//       // Tidy the data & add "calculated columns".
//       // Month length has to be 31 to avoid 2 touches in 1 month (1st and 31st)
//       const monthLength = 31;
//       const monthMilliseconds = monthLength * 24 * 60 * 60 * 1000;

//       accounts.forEach((account) => {
//         // convert account['Go Live'] from string to JS Date.
//         account['Go Live'] = stringToDate(account['Go Live']);

//         // add calculated column: account.lastActivity (set activity['Date'] to JS date when iterating over)

//         const accActivities = activities.filter(
//           (activity) => activity['Account id'] === account['Account id']
//         );

//         account.lastActivity = accActivities
//           ? accActivities.sort((a, b) => b['Date'] - a['Date'])[0]
//           : undefined;

//         // add calculated column: account.nextActivity (will be wrong for those in on-boarding, but this is fixed next)

//         account.nextActivity = account.lastActivity
//           ? new Date(
//               account.lastActivity['Date'].getTime() + monthMilliseconds * 3
//             )
//           : new Date(account['Go Live'].getTime() + monthMilliseconds);

//         // is account in the onboarding flow (first 3 months)? If so nextActivity may need correcting to 1 or 2 months.

//         const date = new Date();
//         const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//         const lastOfMonth = new Date(
//           date.getFullYear(),
//           date.getMonth() + 1,
//           0
//         );

//         account.onboarding = false;
//         account.nextActivityType = 'QBR';

//         const daysLive =
//           (firstOfMonth - account['Go Live']) / 1000 / 24 / 60 / 60;

//         if (daysLive <= 3 * monthLength) {
//           account.onboarding = true;
//           account.nextActivityType = '3rd Check-In';

//           if (daysLive <= monthLength * 2) {
//             account.nextActivityType = '2nd Check-In';
//             account.nextActivity = new Date(
//               account['Go Live'].getTime() + monthMilliseconds * 2
//             );
//           }

//           if (daysLive <= monthLength) {
//             account.nextActivityType = '1st Check-In';
//             account.nextActivity = new Date(
//               account['Go Live'].getTime() + monthMilliseconds
//             );
//           }
//         }

//         // add calculated column: inTouchPlan (should this account be included in the touch plan)

//         account.nextActivity <= lastOfMonth
//           ? (account.inTouchPlan = true)
//           : (account.inTouchPlan = false);

//         // add calculated column: overdue

//         account.nextActivity < firstOfMonth
//           ? (account.overdue = true)
//           : (account.overdue = false);

//         // what progress has there been? Contacted / Task / Event. Not saved until there's a backend
//         account.progress = false;
//       });
//       return setData(accounts);
//     }
//     fetchData();
//   }, []);

//   console.log('cd', data);
//   return data;
// };
