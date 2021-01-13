import Loading from './Loading';

const SearchResult = ({
  movies,
  addToNominated,
  searchTerm,
  loadingResult,
}) => {
  if (loadingResult) {
    return <Loading />;
  }

  return movies.length > 0 ? (
    <div className='card'>
      <div className='card-title__container'>
        <h2 className='card-title'>
          Results for <q>{searchTerm}</q>
        </h2>
      </div>
      <div className='card-content__wrapper'>
        <div className='movie-card__wrapper'>
          {movies.map(({ imdbID, Title, Year, nominated }) => (
            <li className='movie-card' key={imdbID}>
              <div className='movie-card__top'>
                <h3>{Title}</h3>
                <p>({Year})</p>
                <button
                  className={`movie-card__btn ${
                    nominated ? 'disabled' : 'success'
                  }`}
                  disabled={nominated}
                  onClick={() => addToNominated(imdbID)}
                >
                  {nominated ? <del>Nominate</del> : 'Nominate'}
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h2>No movies to display</h2>
  );
};

export default SearchResult;
