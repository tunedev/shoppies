import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import Notification from './components/Notification';
import NominationList from './components/NominationList';
import Banner from './components/Banner';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingResult, setLoadingResult] = useState(false);
  const [loadingAddNomination, setLoadingAddNomination] = useState(false);
  const [loadingRemoveNomination, setLoadingRemoveNomination] = useState(false);
  const [nomination, setNomination] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedNomination =
      JSON.parse(localStorage.getItem('nominations')) || [];

    console.log('saved Nominations', savedNomination);
    setNomination(savedNomination);
  }, []);

  const notify = (message, error = false) => {
    setMessage(message);
    setError(error);
    setInterval(() => {
      setMessage(null);
      setError(false);
    }, 5000);
  };

  const saveNominationsToLocalStorage = () => {
    localStorage.setItem('nominations', JSON.stringify(nomination));
  };

  const addToNominated = async (movieId) => {
    setLoadingAddNomination(true);
    const newNomination = searchResult.find(
      (movie) => movie.imdbID === movieId
    );
    await setNomination(nomination.concat(newNomination));
    saveNominationsToLocalStorage();
    setLoadingAddNomination(false);
  };

  const removeFromNomination = async (movieId) => {
    setLoadingRemoveNomination(true);
    await setNomination(nomination.filter((movie) => movie.imdbID !== movieId));
    saveNominationsToLocalStorage();
    setLoadingAddNomination(false);
  };

  const handleOnChange = async (value) => {
    setLoadingResult(true);
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=deb69ff3&s=${value}&type=movie`
    );
    console.log('Response', response);
    if (response.data.Response === 'False') {
      notify(`${response.data.Error}`, true);
      setSearchResult([]);
    } else {
      setSearchResult(response.data.Search);
    }
    setLoadingResult(false);
  };

  const movies = searchResult.map((movie) => ({
    ...movie,
    nominated:
      nomination.findIndex((nominee) => nominee.imdbID === movie.imdbID) !== -1,
  }));

  return (
    <div>
      <Notification message={message} error={error} />
      <Banner nomination={nomination} />
      <h1>Shoppies</h1>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleOnChange={handleOnChange}
      />
      <SearchResult
        movies={movies}
        searchTerm={searchTerm}
        addToNominated={addToNominated}
        loadingResult={loadingResult}
      />
      <NominationList
        nomination={nomination}
        removeFromNomination={removeFromNomination}
      />
    </div>
  );
}

export default App;
