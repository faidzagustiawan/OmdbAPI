import React from 'react';

const FilterBar = ({
  genre,
  setGenre,
  director,
  setDirector,
  actor,
  setActor,
  minRating,
  setMinRating,
  genreOptions = [],
  directorOptions = [],
  actorOptions = [],
  ratingOptions = [],
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="">-- Genre --</option>
        {genreOptions.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="">-- Director --</option>
        {directorOptions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={actor}
        onChange={(e) => setActor(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="">-- Actor --</option>
        {actorOptions.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="">-- Minimal IMDb Rating --</option>
        {ratingOptions.map((r) => (
          <option key={r} value={r}>
            {r}+
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          setGenre('');
          setDirector('');
          setActor('');
          setMinRating('');
        }}
        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default FilterBar;
