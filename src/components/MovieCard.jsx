import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}
        alt={movie.Title}
        className="w-full h-56 object-cover rounded mb-4"
      />
      <h3 className="font-semibold text-lg">{movie.Title} ({movie.Year})</h3>
      <p className="text-sm text-gray-600">Genre: {movie.Genre}</p>
      <p className="text-sm text-gray-600">Director: {movie.Director}</p>
      <p className="text-sm text-gray-600">Actors: {movie.Actors}</p>
      <p className="text-sm text-yellow-600 font-semibold">IMDb Rating: {movie.imdbRating}</p>
    </div>
  );
};

export default MovieCard;
