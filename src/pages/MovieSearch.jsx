import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';

const API_KEY = 'e7ba5edb'; // Ganti dengan API key OMDb kamu

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [actor, setActor] = useState('');
  const [minRating, setMinRating] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Untuk opsi dropdown
  const [genreOptions, setGenreOptions] = useState([]);
  const [directorOptions, setDirectorOptions] = useState([]);
  const [actorOptions, setActorOptions] = useState([]);

  const ratingOptions = ['0', '5', '6', '7', '8', '9'];

  // Ambil detail lengkap film dari IMDb ID
  const fetchMovieDetail = async (imdbID) => {
    try {
      const res = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: API_KEY,
          i: imdbID,
          plot: 'short',t
        },
      });
      return res.data;
    } catch {
      return null;
    }
  };

  // Fungsi untuk ekstrak opsi unik dari array film
  const extractOptions = (movies) => {
    const genreSet = new Set();
    const directorSet = new Set();
    const actorSet = new Set();

    movies.forEach((movie) => {
      if (movie.Genre) {
        movie.Genre.split(',').map((g) => genreSet.add(g.trim()));
      }
      if (movie.Director && movie.Director !== 'N/A') {
        movie.Director.split(',').map((d) => directorSet.add(d.trim()));
      }
      if (movie.Actors && movie.Actors !== 'N/A') {
        movie.Actors.split(',').map((a) => actorSet.add(a.trim()));
      }
    });

    setGenreOptions(Array.from(genreSet).sort());
    setDirectorOptions(Array.from(directorSet).sort());
    setActorOptions(Array.from(actorSet).sort());
  };

  const onSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    setMovies([]);
    setGenreOptions([]);
    setDirectorOptions([]);
    setActorOptions([]);
    setGenre('');
    setDirector('');
    setActor('');
    setMinRating('');

    try {
      // 1. Cari film berdasarkan query
      const res = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: API_KEY,
          s: query,
          type: 'movie',
        },
      });

      if (res.data.Response === 'False') {
        setError(res.data.Error);
        setLoading(false);
        return;
      }

      // 2. Ambil detail film secara paralel, batasi max 10 film
      const moviesShort = res.data.Search.slice(0, 10);
      const detailsPromises = moviesShort.map((m) => fetchMovieDetail(m.imdbID));
      const details = await Promise.all(detailsPromises);

      // 3. Set opsi filter berdasarkan data detail film
      extractOptions(details);

      // 4. Set movies awal (belum filter)
      setMovies(details.filter(m => m !== null));
    } catch (err) {
      setError('Gagal mengambil data film.');
    } finally {
      setLoading(false);
    }
  };

  // Filter manual saat filter diubah
  const filteredMovies = movies.filter((movie) => {
    if (!movie) return false;

    if (genre && !movie.Genre.toLowerCase().includes(genre.toLowerCase())) return false;

    if (director && !movie.Director.toLowerCase().includes(director.toLowerCase())) return false;

    if (actor && !movie.Actors.toLowerCase().includes(actor.toLowerCase())) return false;

    if (minRating) {
      const ratingNum = parseFloat(movie.imdbRating);
      if (isNaN(ratingNum) || ratingNum < parseFloat(minRating)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Advanced Movie Search</h1>
        <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        <FilterBar
          genre={genre}
          setGenre={setGenre}
          director={director}
          setDirector={setDirector}
          actor={actor}
          setActor={setActor}
          minRating={minRating}
          setMinRating={setMinRating}
          genreOptions={genreOptions}
          directorOptions={directorOptions}
          actorOptions={actorOptions}
          ratingOptions={ratingOptions}
        />
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        <MovieGrid movies={filteredMovies} />
      </div>
    </div>
  );
};

export default MovieSearch;
