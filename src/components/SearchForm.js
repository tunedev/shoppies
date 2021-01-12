const SearchForm = ({ searchTerm, setSearchTerm, handleOnChange }) => {
  return (
    <form>
      <p>Movie title</p>
      <input
        type='search'
        value={searchTerm}
        onChange={({ target }) => {
          setSearchTerm(target.value);
          handleOnChange(target.value);
        }}
      />
    </form>
  );
};

export default SearchForm;
