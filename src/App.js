import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import Notification from './components/Notification';
import NominationList from './components/NominationList';
import Banner from './components/Banner';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loadingResult, setLoadingResult] = useState(false);
  const [nomination, setNomination] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedNomination =
      JSON.parse(localStorage.getItem('nominations')) || [];

    console.log('saved Nominations', savedNomination);
    setNomination(savedNomination);
  }, []);

  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nomination));
  }, [nomination]);

  const notify = (message, error = false) => {
    let timerId;
    (() => {
      clearTimeout(timerId);
      setMessage(message);
      setError(error);
      timerId = setTimeout(() => {
        setMessage(null);
        setError(false);
      }, 5000);
    })();
  };

  const addToNominated = async (movieId) => {
    if (nomination.length >= 5) {
      notify('You have reached maximum nomination', true);
      return;
    }
    const newNomination = searchResult.find(
      (movie) => movie.imdbID === movieId
    );
    await setNomination(nomination.concat(newNomination));
  };

  const removeFromNomination = async (movieId) => {
    await setNomination(nomination.filter((movie) => movie.imdbID !== movieId));
  };

  const handleOnChange = debounce(async (value) => {
    setLoadingResult(true);
    let response;
    try {
      response = await axios.get(
        `https://www.omdbapi.com/?apikey=deb69ff3&s=${value}&type=movie`
      );
    } catch (error) {
      console.log(error.response.data);
      notify(error.message, true);
    }
    console.log('Response', response);
    if (response.data.Response === 'False') {
      if (response.data.Error === 'Incorrect IMDb ID.') {
        setLoadingResult(false);
        return;
      }
      notify(`${response.data.Error}`, true);
      setSearchResult([]);
    } else {
      setSearchResult(response.data.Search);
      notify();
    }
    setLoadingResult(false);
  }, 350);

  const movies = searchResult.map((movie) => ({
    ...movie,
    nominated:
      nomination.findIndex((nominee) => nominee.imdbID === movie.imdbID) !== -1,
  }));

  return (
    <div className='app'>
      <div className='container'>
        <Notification message={message} error={error} />
        <h1 className='app__title'>The Shoppies</h1>
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleOnChange={handleOnChange}
        />
        <Banner nomination={nomination} />
        <div className='list-content'>
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
      </div>
    </div>
  );
}

export default App;
