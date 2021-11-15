import { useMemo } from 'react';

export const Qbr = (props) => {
  const { data, setData } = props;

  //if (!data) return <pre>Loading...</pre>;

  const quartly = useMemo(() => {
    return data.filter((account) => !account.onboarding);
  }, [data]);

  if (!quartly || quartly.length === 0) return 'No accounts due QBRs';

  return (
    <>
      <h2>QBRs</h2>

      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Owner</th>
            <th>Customer Since</th>
            <th>Next Outreach</th>
            <th>Due</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {quartly.map((account, i) => {
            let even = '';
            i % 2 === 0 && (even = 'even');
            return (
              <tr key={account['Account id']} className={even}>
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
                <td>
                  <button
                    className={
                      account.progress === 'contacted' ? 'selected' : ''
                    }
                    onClick={() => {
                      account.progress === 'contacted'
                        ? (account.progress = false)
                        : (account.progress = 'contacted');
                      setData([...data]);
                    }}
                  >
                    C
                  </button>{' '}
                  <button
                    className={account.progress === 'task' ? 'selected' : ''}
                    onClick={() => {
                      account.progress === 'task'
                        ? (account.progress = false)
                        : (account.progress = 'task');
                      setData([...data]);
                    }}
                  >
                    T
                  </button>{' '}
                  <button
                    className={account.progress === 'event' ? 'selected' : ''}
                    onClick={() => {
                      account.progress === 'event'
                        ? (account.progress = false)
                        : (account.progress = 'event');
                      setData([...data]);
                    }}
                  >
                    E
                  </button>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
