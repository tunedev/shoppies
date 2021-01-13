import searchIcon from '../search_icon.png';

const SearchForm = ({ searchTerm, setSearchTerm, handleOnChange }) => {
  return (
    <form
      className='search-form card'
      onSubmit={(e) => {
        e.preventDefault();
        handleOnChange(searchTerm);
      }}
    >
      <div className='search-form__container'>
        <p className='search-form__title'>Movie title</p>
        <div className='input-container'>
          <div className='search-icon__container'>
            <img className='search-icon' src={searchIcon} alt='search icon' />
          </div>
          <input
            type='search'
            className='search__input'
            placeholder='Search for movies here'
            value={searchTerm}
            onChange={({ target }) => {
              setSearchTerm(target.value);
              handleOnChange(target.value);
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
