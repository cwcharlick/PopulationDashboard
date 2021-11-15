export const OwnerFilter = (props) => {
  const { filter, setFilter, unfilteredData, setData } = props;

  if (!unfilteredData) return <pre>Loading...</pre>;

  const accountOwners = [];

  unfilteredData.forEach(
    (row) =>
      !accountOwners.includes(row['Account Owner']) &&
      accountOwners.push(row['Account Owner'])
  );

  return (
    <div className="asdfg">
      <h4>Account Owners</h4>
      <button
        onClick={() => {
          setData(unfilteredData);
          setFilter(undefined);
        }}
        className={!filter ? 'selected' : ''}
      >
        All
      </button>

      {accountOwners.map((owner) => (
        <button
          key={owner}
          onClick={() => {
            setData(
              unfilteredData.filter(
                (account) => account['Account Owner'] === owner
              )
            );
            setFilter(owner);
          }}
          className={filter === owner ? 'selected' : ''}
        >
          {owner}
        </button>
      ))}
    </div>
  );
};
