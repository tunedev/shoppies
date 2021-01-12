const NominationList = ({ nomination, removeFromNomination }) => {
  return (
    <div>
      <h2>Nominations</h2>
      {nomination.length > 0 ? (
        <div>
          {nomination.map(({ imdbID, Title, Year }) => (
            <li key={imdbID}>
              <span>{Title}</span> <span>({Year})</span>{' '}
              <button onClick={() => removeFromNomination(imdbID)}>
                Remove
              </button>
            </li>
          ))}
        </div>
      ) : (
        <p>You have not nominated any movie yet</p>
      )}
    </div>
  );
};

export default NominationList;
