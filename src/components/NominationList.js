const NominationList = ({ nomination, removeFromNomination }) => {
  return (
    <div className='card nominations'>
      <div className='card-title__container'>
        <h2 className='card-title'>Nominations</h2>
      </div>
      <div className='card-content__wrapper'>
        {nomination.length > 0 ? (
          <div className='movie-card__wrapper'>
            {nomination.map(({ imdbID, Title, Year }) => (
              <li key={imdbID} className='movie-card'>
                <div className='movie-card__top'>
                  <h3>{Title}</h3>
                  <p>({Year})</p>
                  <button
                    className='movie-card__btn danger'
                    onClick={() => removeFromNomination(imdbID)}
                  >
                    <i class='fas fa-trash'></i>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <p>You have not nominated any movie yet</p>
        )}
      </div>
    </div>
  );
};

export default NominationList;
