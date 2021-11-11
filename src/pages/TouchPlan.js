import { format } from 'd3-format';
import { useEffect, useState } from 'react';
import { useAccountActivity } from '../hooks/useAccountActivity';

export const TouchPlan = () => {
  const [data, setData] = useState(undefined);
  const touchPlanData = useAccountActivity();
  useEffect(() => setData(touchPlanData), [touchPlanData]);

  if (!data) return <pre>Loading...</pre>;

  console.log(data);

  let overdue = data.filter((account) => account.overdue);
  overdue.length === 0 && (overdue = 'No overdue accounts');

  let onboarding = data.filter((account) => account.onboarding);
  onboarding.length === 0 && (onboarding = 'No onboarding accounts');

  let quartly = data.filter((account) => !account.onboarding);
  quartly.length === 0 && (quartly = 'No accounts due QBRs');

  return (
    <div>
      <h2>Overdue accounts</h2>
      {typeof overdue === 'string' ? (
        overdue
      ) : (
        <table>
          <thead>
            <th>Account</th>
            <th>CSM</th>
            <th>Customer Since</th>
            <th>Next Outreach</th>
            <th>Due</th>
            <th>Contacted</th>
          </thead>
          <tbody>{formatOverdue(overdue)}</tbody>
        </table>
      )}
      <h2>Onboarding accounts</h2>
      {typeof onboarding === 'string' ? (
        onboarding
      ) : (
        <table>
          <tbody>{formatOnboarding(onboarding)}</tbody>
        </table>
      )}
      <h2>QBRs</h2>
      {typeof quartly === 'string' ? (
        quartly
      ) : (
        <table>
          <tbody>{formatQbr(quartly)}</tbody>
        </table>
      )}
    </div>
  );
};

function formatOverdue(overdue) {
  return (
    <>
      {overdue.map((account) => (
        <tr key={account['Account id']}>
          <td className="left">{account['Account Name']}</td>
          <td>{account['Account Owner']}</td>
          <td>
            {account['Go Live'].toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </td>
          <td>{account.nextActivityType}</td>
          <td>
            {account.nextActivity.toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </td>
          <td>{account.contacted ? 'yes' : 'no'}</td>
        </tr>
      ))}
    </>
  );
}

function formatOnboarding(onboarding) {
  return (
    <>
      {onboarding.map((account) => (
        <tr key={account['Account id']}>
          <td className="left">{account['Account Name']}</td>
        </tr>
      ))}
    </>
  );
}

function formatQbr(qbr) {
  return (
    <>
      {qbr.map((account) => (
        <tr key={account['Account id']}>
          <td className="left">{account['Account Name']}</td>
        </tr>
      ))}
    </>
  );
}
