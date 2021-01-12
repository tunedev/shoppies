const SearchResult = ({
  movies,
  addToNominated,
  searchTerm,
  loadingResult,
}) => {
  if (loadingResult) {
    return <p>Loading ...</p>;
  }

  return movies.length > 0 ? (
    <div>
      <h3>
        Results for <q>{searchTerm}</q>
      </h3>
      {movies.map(({ imdbID, Title, Year, nominated }) => (
        <li key={imdbID}>
          <span>{Title}</span> <span>({Year})</span>{' '}
          <button disabled={nominated} onClick={() => addToNominated(imdbID)}>
            {nominated ? <del>Nominate</del> : 'Nominate'}
          </button>
        </li>
      ))}
    </div>
  ) : (
    <h4>No Movies to display</h4>
  );
};

export default SearchResult;
